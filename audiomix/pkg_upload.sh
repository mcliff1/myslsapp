#!/bin/bash
#
# zip up the resources and uploads the S3 bucket
#
# requires: zip, aws cli (with credentials)

#
BUCKET=audiomix-workbucket-xw1zulrmqu6f
ZIPFILE=audiomix.zip
#PROFILE="--profile mp3"
LAMBDA_FUNCTION=audiomix

zip -u --symlink --recurse-paths ${ZIPFILE} transcoder.js package.json node_modules/ exodus/
# symlink not support in gitbash
#zip --recurse-paths ${ZIPFILE} transcoder.js package.json node_modules/ exodus/

time aws ${PROFILE} s3 cp ${ZIPFILE} s3://${BUCKET}

aws ${PROFILE} lambda update-function-code --function-name ${LAMBDA_FUNCTION} --s3-bucket ${BUCKET} --s3-key ${ZIPFILE}


