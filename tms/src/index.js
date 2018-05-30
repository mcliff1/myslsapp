import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import Amplify from 'aws-amplify';
//import { setupCognito, cognito } from 'react-cognito';
import registerServiceWorker from './registerServiceWorker';

// see github AnomalyInnovations serverless-stack-demo-client
import './index.css';
import App from './App';
import config from './config.json';

Amplify.configure({
  Auth: {
    region: config.region,
    userPoolId: config.userPool,
    userPoolWebClientId: config.clientId
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
