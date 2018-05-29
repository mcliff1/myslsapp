#!/bin/bash

# this would come from AWS Paramter Store  /tmsbase/webHostName
#  (or cloudformation output  tms-)
#  make AWS call to get it...
REGION=us-west-2
BUCKET_NAME=`aws ssm get-parameter --name "/tmsbase/webBucketName" --region ${REGION} | jq -r .Parameter.Value`

TARGET_BUCKET=s3://${BUCKET_NAME}

# source variables
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"

cd $__dir
npm install
npm run build

aws s3 sync build ${TARGET_BUCKET}
