#!/bin/bash

# this would come from AWS Paramter Store  /tmsbase/webHostName
#  (or cloudformation output  tms-)
#  make AWS call to get it...
TARGET_BUCKET=s3://tmsbase-webbucket-0okwetxp1389
# source variables
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"

cd $__dir
npm install
npm run build

aws s3 sync build ${TARGET_BUCKET}
