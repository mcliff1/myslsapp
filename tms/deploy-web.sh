#!/bin/bash
# ensure the cognito config is present
# pull S3 value from AWS Paramter Store  /tmsbase/webHostName


__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"

# first make sure the config.json file is there
$__dir/gen-cognito-config.sh


REGION=us-west-2
BUCKET_NAME=`aws ssm get-parameter --name "/tmsbase/webBucketName" --region ${REGION} | jq -r .Parameter.Value`

TARGET_BUCKET=s3://${BUCKET_NAME}

echo "made it"
exit 2
cd $__dir
npm install
npm run build

aws s3 sync build ${TARGET_BUCKET}
