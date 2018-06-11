# Polly

Sample project to show case serverless technology and speech translations.

Includes
*polly-cfn-base.json* which creates 2 S3 buckets, domain names and DynamoDB for meta data,  additionally an API and lambda function get created with a *serverless.yml* file.

The end result is controlled by two stacks in *AWS CloudFormation*.

there is also a REACT UI that gets deployed to S3 to present the tool


## Install Notes
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


The API folder was created with the *serverless* tool.
`serverless craete --template aws-python3 --path api` (**NOTE** I had to run this on a EC2 instance set up for Node)
