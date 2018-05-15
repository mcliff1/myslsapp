#  Static incognito

This folder has static content intended to tie into Cognito and a GraphQL service providing notes.

Requires a **config.js** file in *js/* folder with

<pre>
const cognitoSettings = {
  UserPoolId: <AWS_COGNITO_POOL>,
  ClientId: '<AWS_COGNITO_CLIENT_ID>,'
}

const apiGPrefix = API_URL
</pre>
