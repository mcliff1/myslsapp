# TMS static content project

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Design

[Design Docs](https://github.com/mcliff1/myslsapp/tms/usecases/README.md)

API design using [swagger.yml](https://github.com/mcliff1/myslsapp/tms/api/serverless.yml)



## REACT/Redux

This UI framework is using REACT with Redux for state management; at the top level of the src, the comonents represents the react components that are not redux-aware (dumb components), and the containers (smart components) connect the redux state to react properties.  It is a balance to have more dumb components for isolation and better unit testing, the trade off is passing more properties down which must be minimized as well.  Fromik is being used for the Form implementation.




## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
