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
" todo - add parameter for column names here

LOGGER = logging.getLogger()
LOGGER.setLevel(logging.INFO)


def decode_json(dct):
    """
    wraps float with Decimal and general serialization to insert into dyanamo
    """
    for key, val in dct.items():
        logging.info("1{%s, %s} type - %s", key, val, type(val))
        if isinstance(val, float):
            logging.info("setting %s to Decimal", key)
            dct[key] = Decimal(str(val))
            logging.info("type is %s", type(dct[key]))
        else:
            try:
                dct[key] = TypeSerializer().serialize(val)
            except:
                dct[key] = val


    # loop throught a second time
    for key, val in dct.items():
        logging.info("2{%s, %s} type - %s", key, val, type(val))

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

    logging.info("insertReading: %s", in_json)
    rc = 503
    jstr = None
    try:
        logging.info("about to execute")
        ddb_json = decode_json(in_json)
        ddb_json['CreatedAt'] = timestamp
        ddb_json['Id'] = # generate UUID or auto-increment
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
        },
    }






def get_call(jsonstr):
    """
    Does the GET request for the specific object and given request string
    """
    logging.info("get_call(%s)" % (jsonstr,))

    jstr = None
    rc = 503
    try:


        if jsonstr is not None and 'startdate' in jsonstr.keys():
            fromdate = jsonstr['startdate']
            logging.info("parse date '%s' as %s" % (fromdate, parse(fromdate)))


        if jsonstr is None:
            """
            No Parameters - Query most recent row in table matching this bot_type
            """
            nrow = db_table.query(IndexName="BotTypeIndex", Select="COUNT", KeyConditionExpression=Key('bottype').eq(bot_type))['Count']
            rslt = db_table.query(IndexName="BotTypeIndex", ScanIndexForward=False, Limit=1, KeyConditionExpression=Key('bottype').eq(bot_type))['Items']
            r_deviceid = None
            r_CreatedAt = None
            if len(rslt) > 0:
                r_CreatedAt = rslt[0]['CreatedAt']
                r_deviceid = rslt[0]['Id']  # todo trim this later


            # trims off the bottype from Id
            if len(r_deviceid) > 0:
                r_deviceid = '-'.join(r_deviceid.split('-')[1:])

            jstr = {"count" : nrow,
                    "deviceid": r_deviceid,
                    "CreatedAt": r_CreatedAt}
            rc = 200

        elif 'deviceid' in jsonstr.keys():
            """
            Return data for this bot
            """


            if 'startdate' in jsonstr.keys():
                """
                we also have to filter on the date
                """

                rslt = db_table.query(KeyConditionExpression=Key('Id').eq(bot_type + '-' + jsonstr['deviceid']) & Key('CreatedAt').gte(jsonstr['startdate']))['Items']


            else:
                """
                return all data for this device
                """
                rslt = db_table.query(KeyConditionExpression=Key('Id').eq(bot_type + '-' + jsonstr['deviceid']))['Items']



            # this is a list of JSON objects,  do I just return them direct??
            logging.info(len(rslt))

            # strip out the Id field
            for element in rslt:
                del element['Id']

            jstr = rslt
            rc = 200
        elif 'startdate' in jsonstr.keys():
            """
            Return ALL data for this type of bot since this date

            NOT SUPPORTED
            """

            rslt = db_table.query(IndexName="BotTypeIndex", KeyConditionExpression=Key('bottype').eq(bot_type) & Key('CreatedAt').gte(jsonstr['startdate']))['Items']




            # I think I need to loop through and do a bulk query on this list of keys
            # strip out the Id field
            for element in rslt:
                del element['Id']

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

    Requires 'deviceid' to be present
      primary key - combination of '{bot_type}-{deviceid}'
      secondary key - new timestamp form at 'YYYY-MM-DD HH:mm:ss'
    """
    logging.info("debug: event: %s", event)


    operation = event['httpMethod']
    data = event['queryStringParameters'] if operation == 'GET' else json.loads(event['body'])

    bot_type = event['pathParameters']['bottype']

    logging.info("read the bottype: %s", bot_type)
    logging.debug("incoming data: %s", data)

    operations = {
        'POST' : lambda jsonstr, bot_type: post_call(bot_type, jsonstr),
        'GET' : lambda jsonstr, bot_type: get_call(bot_type, jsonstr)
    }


    # see if we can delegate the call
    if (operation in operations and bot_type in BOT_TYPES):
        return operations[operation](data, bot_type)

    logging.error("unknown method(%s) or resource(%s)", operation, resource)

    return {
        "body": {"message" : "unknown method(%s) or bot_type(%s)" % (operation, bot_type)},
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
