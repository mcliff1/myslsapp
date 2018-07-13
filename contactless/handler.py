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

    form = """
        <div><b><p id="form-response"></p></b></div>
        <form id="contactForm">
        <div class="row">
        <label>Email</label>
        <input class="form-control" type="text" name="email" placeholder="email@yahoo.com" required />
        </div>

        <div class="row">
        <input type="submit" class="btn btn-primary" value="Submit"/>
        </div>
        </form>
        """

    script = """
        $(document).ready(function(){

            $('#contactForm').submit(function(event) {
                var formData = new FormData();
                formData.append('email', $('#email').val());
                alert("Here we go:", formData);


                fetch('https://contact.mattcliff.net/', {
                    method: 'POST',
                    url: '/',
                    success: function() {
                        alert("got success");
                        $('#form-response').text('data sent');
                    },
                    error: function() {
                        alert("got error");
                        $('#form-response').text('There was an error');
                    }
                });

                return false;
            });

        });
        """

    body = """
        <html>
        <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link id="favicon" rel="shortcut icon" type="image/x-icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD8fwAA/H8AAPxjAAD/4wAA/+MAAMY/AADGPwAAxjEAAP/xAAD/8QAA4x8AAOMfAADjHwAA//8AAP//AAA=" >
        </head>
        <body style="margin-left: 25px">
        <div><h2>Serverless Contact Demo</h2></div>
        <div>
        """ + form + """
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script>
        """ + script + """
        </script>
        </body>
        </html>
        """

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
    logging.info("incoming data: %s", data)

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
