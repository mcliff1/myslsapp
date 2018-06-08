#!/bin/bash

# creates the file ./src/config.json (relative to script location)
#  contains region, userPool, clientId
#
# this would come from AWS Paramter Store  /${BASESTACK}/cognitoClientId
# this would come from AWS Paramter Store  /${BASESTACK}/cognitoUserPoolId
REGION=us-west-2
BASESTACK=tmsbase

# source variables
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"


OUTFILE=$__dir/src/config.json

if [ -e $OUTFILE ]
then
  echo "Target file already exists, exiting."
  exit 1
fi


echo "Pull attributes from SSM to generate: $OUTFILE"


# pull from SSM (assumes user in role)
CLIENT_ID=`aws ssm get-parameter --name "/${BASESTACK}/cognitoClientId" --region ${REGION} | jq -r .Parameter.Value`
USER_POOL=`aws ssm get-parameter --name "/${BASESTACK}/cognitoUserPoolId" --region ${REGION} | jq -r .Parameter.Value`



cat > $__dir/src/config.json << EOM
{
  "region" : "${REGION}",
  "userPool" : "${USER_POOL}",
  "clientId" : "${CLIENT_ID}" 
}
EOM
