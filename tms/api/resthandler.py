"""
apihandler.py

author: matt cliff
created: april 8, 2018

AWS lambda python 3.6 code

Generic handle provides standard API Rest interface
for generic objects.

"""
import os
import datetime
import json
import logging
import uuid
from dateutil.parser import parse
from decimal import Decimal


import boto3
from boto3.dynamodb.conditions import Key, Attr


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)



dynamodb = boto3.resource('dynamodb')
db_table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)


def decode_json(dct):
    """
    wraps float with Decimal and general serialization to insert into dyanamo
    """
    for key, val in dct.items():
        #logging.info("1{%s, %s} type - %s", key, val, type(val))
        if isinstance(val, float):
            logging.info("setting %s to Decimal", key)
            dct[key] = Decimal(str(val))
            logging.info("type is %s", type(dct[key]))
        else:
            try:
                dct[key] = TypeSerializer().serialize(val)
            except:
                dct[key] = val


    return dct



def post_call(in_json):
    """
    generic function inserts keys from the json string

    TODO checks
    - ensure bottype in payload matches from URI
    - ensure deviceid exists
    - do we drop the 'beg' attribute?
    """
    timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    logging.info("insert: %s", in_json)
    rc = 503
    jstr = None
    try:
        logging.info("about to execute")
        ddb_json = decode_json(in_json)
        ddb_json['CreatedAt'] = timestamp
        ddb_json['Id'] = str(uuid.uuid4())
        ddb_json['ObjectType'] = 'Customer'
        ddb_json = {k:v for k,v in ddb_json.items() if v != ''}
        db_table.put_item(Item=ddb_json)
        rc = 200
        #logging.info("class %s json - %s", type(ddb_json), ddb_json)
        jstr = str(ddb_json)
        #logging.info("commit complete")
    except Exception as db_exception:
        logging.exception(db_exception)
        rc = 500
        jstr = { "err" : json.loads(str(db_exception)) }

    return {
        "body": json.dumps(jstr),
        "statusCode" : rc,
        "headers": {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",

        },
    }


def put_call(in_json):
    """
    Performs an update on the item
    """
    logging.info("put_call(%s)" % (in_json,))

    rc = 503
    jstr = None
    try:
        if in_json is not None and 'Id' in in_json.keys():
            itemKey = {
                'Id' : in_json['Id'],
                'ObjectType' : in_json['ObjectType']
            }
            # first pull the existing
            #olditem = db_table.get_item(Key = itemKey);
            # lay the new stuff on top

            ddb_json = decode_json(in_json)
            ddb_json = {k:v for k,v in ddb_json.items() if v != ''}
            db_table.put_item(Item=ddb_json)
        rc = 200
        #logging.info("class %s json - %s", type(ddb_json), ddb_json)
        jstr = str(ddb_json)
        #logging.info("commit complete")
    except Exception as db_exception:
        logging.exception(db_exception)
        rc = 500
        jstr = { "err" : json.loads(str(db_exception)) }

    return {
        "body": json.dumps(jstr),
        "statusCode" : rc,
        "headers": {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",

        }
    }

def delete_call(in_json):
    """
    Performs delete on the item id
    """
    logging.info("delete_call(%s)" % (in_json,))

    rc = 503
    jstr = None
    try:
        if in_json is not None and 'Id' in in_json.keys():
            #ddb_json = decode_json(in_json)
            itemKey = {
                'Id' : in_json['Id'],
                'ObjectType' : in_json['ObjectType']
            }
            db_table.delete_item(Key = itemKey);
            rc = 200
        else:
            logging.error("we do not have id in the request")
            jstr = { "err" : "missing Id in requrest" }


    except Exception as db_exception:
        logging.exception(db_exception)
        jstr = { "err" : str(db_exception) }

    logging.info("return string %s", jstr)
    return {
        "body": json.dumps(jstr, cls=DecimalEncoder),
        "statusCode" : rc,
        "headers": {
            "Access-Control-Allow-Origin" : "*",
            "Content-Type" : "application/json",
        }
    }



def get_call(jsonstr):
    """
    Does the GET request for the specific object and given request string
    """
    logging.info("get_call(%s)" % (jsonstr,))

    jstr = None
    rc = 503
    try:


        if jsonstr is None:
            """
            No Parameters - Query most recent row in table matching this bot_type
            """

            rslt = db_table.scan()
            jstr = rslt['Items']
            rc = 200

        elif 'deviceid' in jsonstr.keys():
            """
            Return data for this bot   TODO - change to ObjectType
            """

            rslt = db_table.query(KeyConditionExpression=Key('Id').eq(bot_type + '-' + jsonstr['deviceid']))['Items']

            # this is a list of JSON objects,  do I just return them direct??
            logging.info(len(rslt))

            jstr = rslt
            rc = 200
        else:
            jstr = {"msg" : "invalid request parameters",
                    "data" : jsonstr}
            rc = 400

    except Exception as db_exception:
        logging.exception(db_exception)
        jstr = { "err" : str(db_exception) }


    logging.info("return string %s", jstr)
    return {
        "body": json.dumps(jstr, cls=DecimalEncoder),
        "statusCode" : rc,
        "headers": {
            "Access-Control-Allow-Origin" : "*",
            "Content-Type" : "application/json",
        },
    }



def handle(event, context):
    """
    REST endpoint to DynamoDB table

      primary key - uuid generated at insert
      secondary key - objectType - Customer, Load, Carrier, etc
    """
    logging.info("debug: event: %s", event)


    operation = event['httpMethod']
    data = event['queryStringParameters'] if operation == 'GET' else json.loads(event['body'])

    logging.debug("incoming data: %s", data)

    operations = {
        'POST' : lambda jsonstr: post_call(jsonstr),
        'GET' : lambda jsonstr: get_call(jsonstr),
        'DELETE' : lambda jsonstr: delete_call(jsonstr),
        'PUT' : lambda jsonstr: put_call(jsonstr)
    }


    # see if we can delegate the call
    if (operation in operations):
        return operations[operation](data)

    logging.error("unknown method(%s) or resource(%s)", operation, resource)

    return {
        "body": {"message" : "unknown method(%s)" % (operation, )},
        "statusCode" : 400,
        "headers": {
            "Content-Type" : "application/json",
        },
    }





def handle1(event, context):
    """
    used for debugging
    """
    logging.info("debug: event: %s", event)
    logging.info("debug: context: %s", context)
    return {
        "body": json.dumps(event),
        "headers": {
            "Content-Type" : "application/json",
        },
    }
