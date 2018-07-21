# My Serverless App


The repository is a collection of resouces to support a serverless application on **AWS Cloud** using the **REACT** framework.

Folder | Summary
---|---
MyDemo  |  ...
react_base  | base react, this project was pieced together to get a better understanding of the REACT environment
static_congito  |  simple static content leveraging AWS Cognito
tms  | *Transportation Management System* template site for logistics company management
audiomix | lambda function to wrap ffmpeg which will combine mp3 files

This app will have login capability, a list of customers, a list of items, and orders.

## Setup
**Preqrequisite** - have a hosted zone available in Route53.
 - ACM record must be set up for certificate

The [cfn-ec2workstation.json](cfn-ec2workstation.json) cloudformation template creates a server with the appropriate roles to build and deploy the serverless example applications.

For a new domain name, the `sls create_domain --region <region>` must be called to create the appropriate record in API Gateway to link the SSL cert.

When running *sls* commands, the **--region** flag MUST be specified, since we are using roles for access, and not having to run *aws config* or set up any keys in the environment.


## REACT front-end

### REACT base
The *react_base* folder has a basic **REACT** framework, the only dependency is that node.js and npm are installed.

In the *react_base* directory to install the necessary *Node.js* components

`npm install`

Then to turn on webpack as a watcher.

`npm run dev`

This will create the *src/client/public/bundle.js* file which our hard coded *src/client/index.html* references and can be accessed from any static content provider.

skeleton based off these [notes](http://blog.tamizhvendan.in/blog/2015/11/23/a-beginner-guide-to-setup-react-dot-js-environment-using-babel-6-and-webpack/) for a simple REACT framework.

### MyDemo

This is the React Starter Kit *isomorphic* web app boilerplate.  This is really a model for how to tie in the pieces one by one.


### nav-app

I need to rename this;  this is a REACT framework using the *react create script* in Node Js.

This will start a web server on port 3000, and a watcher on the react resources

`npm start`







## AWS Lambda

Follow along with [Serverless Stack](https://serverless-stack.com/)

Git directories
- sls1
- sls2 (microservice #2
- slsframework  (S3, Congito, DynamoDB, Route53, CDN)
- static  (code to build the static REACT framework)


## AWS CloudFormation

cfn-ec2workstation.json    #  cloudformation template to build a SLS workstation
  - it is intended for system work, we can stand this up,  update the repo as necessary and, tear down
  - will set up the
  - TODO:  should I make a brand new VPC for this?


## Build and Deploy Process

To Build
- create a SLS workstation using the CFN template
- git config --edit
- git clone https://github.com/mcliff1/myslsapp
- cd myslsapp
- cd slsframework
- sls deploy
- - requires inputs: Cognito, Domain Name ????
- - has CFN exports:  (definatetly, anything needed by sls1, sls2, etc)
- - somehow export what is needed for REACT/Amplify build
- (repeat for sls1, sls2, ...)
- cd ~/myslsapp/static
- npm run build
- - requires as input some of the information from other cloudformations
- aws s3 sync build/* s3://my-deploy-bucket/   (can this be added to myslsapp/static/json.package to run as npm run deploy or something?)
