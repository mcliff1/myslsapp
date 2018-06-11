import boto3
import os
import uuid
import json
from boto3.dynamodb.conditions import Key, Attr

"""
expects to have  string object 'postId' passed in as data

returns JSON object from DB for data of id or all of database
"""
def handle_get(event):

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
    postId = event['postId']

    if postId=="*":
        items = table.scan()
    else:
        items = table.query(
            KeyConditionExpression=Key('id').eq(postId)
        )

    return items["Items"]


"""
event should have parameters voice and text that
   represent the string objects to pass into polly
"""
def handle_post(event):

    recordId = str(uuid.uuid4())
    voice = event["voice"]
    text = event["text"]
    #Creating new record in DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
    table.put_item(
        Item={
            'id' : recordId,
            'text' : text,
            'voice' : voice,
            'status' : 'PROCESSING'
        }
    )

    #Sending notification about new post to SNS
    client = boto3.client('sns')
    client.publish(
        TopicArn = os.environ['SNS_TOPIC'],
        Message = recordId
    )

    return recordId


def apihandler(event, context):

    operation = event['httpMethod']
    operations = {
        'POST' : lambda data: post_call(data),
        'GET' : lambda data: get_call(data)
    }

    # see if we can delegate the call
    if (operation in operations):
        return operations[operation](event)

    logging.error("unknown method(%s) or resource(%s)", operation, resource)

    return {
        "body": {"message" : "unknown method(%s) or bot_type(%s)" % (operation, bot_type)},
        "statusCode" : 400,
        "headers": {
            "Content-Type" : "application/json",
        },
    }
