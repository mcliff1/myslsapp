#!/bin/bash

# requires aws-cli

LAMBDA_FUNCTION=audiomix
# pull this from cloudformation output (or ssm)
ROLE_ARN=arn:aws:iam::145234481279:role/audiomix-Mp3Role-1QZG4VYAN9YLP
#PROFILE="--profile mp3"
ZIPFILE=audiomix.zip

# go ahead and build a shell first
#zip --symlink --recurse-paths ${ZIPFILE} transcoder.js package.json node_modules/ exodus/
zip --symlink --recurse-paths ${ZIPFILE} transcoder.js 

aws $PROFILE lambda create-function \
    --function-name $LAMBDA_FUNCTION \
    --zip-file fileb://${ZIPFILE} \
    --handler transcoder.handler \
    --runtime nodejs8.10 \
    --timeout 300 \
    --role ${ROLE_ARN}



