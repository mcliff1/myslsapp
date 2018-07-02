"""
handler.py

author: matt cliff
created: july 1, 2018

Serves Get/Post to display a contact us form and also accept the post.

"""
import os
import datetime
import json
import logging
import uuid
from dateutil.parser import parse
from decimal import Decimal


import boto3


class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)




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

    """
    timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    logging.info("insert: %s", in_json)
    rc = 503
    jstr = { "result" : "nothing happened" }

    return {
        "body": json.dumps(jstr),
        "statusCode" : rc,
        "headers": {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",

        },
    }




def get_call(jsonstr):
    """
    Does the GET request for the specific object and given request string
    """
    logging.info("get_call()")

    form = "<table border=\"1\"><tr><td>1</td><td>hut</td></tr></table>"
    body = "<html><body><div>THis is the body</div><div>" + form + "</div></body></html>"

    return {
        "body": body,
        "statusCode" : 200,
        "headers": {
            "Access-Control-Allow-Origin" : "*",
            "Content-Type" : "text/html",
        },
    }



def handle(event, context):
    """
    REST endpoint to DynamoDB table

      primary key - uuid generated at insert
    """
    logging.info("debug: event: %s", event)


    operation = event['httpMethod']
    data = event['queryStringParameters'] if operation == 'GET' else json.loads(event['body'])
    if data is None:
        data = {}

    # inject the object Type to the data string
    logging.debug("incoming data: %s", data)

    operations = {
        'POST' : lambda jsonstr: post_call(jsonstr),
        'GET' : lambda jsonstr: get_call(jsonstr)
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
