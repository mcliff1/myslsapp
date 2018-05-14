# myslsapp
My Serverless App

This app will have login capability, a list of customers, a list of items, and orders.

added *react_base* which is a skeleton based off these [notes](http://blog.tamizhvendan.in/blog/2015/11/23/a-beginner-guide-to-setup-react-dot-js-environment-using-babel-6-and-webpack/) for a simple REACT framework.


Follow along with [Serverless Stack](https://serverless-stack.com/)

Git directories
- sls1
- sls2 (microservice #2
- slsframework  (S3, Congito, DynamoDB, Route53, CDN)
- static  (code to build the static REACT framework)


cfn-ec2workstation.json    #  cloudformation template to build a SLS workstation
  - it is intended for system work, we can stand this up,  update the repo as necessary and, tear down
  - will set up the 
  - TODO:  should I make a brand new VPC for this?


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
