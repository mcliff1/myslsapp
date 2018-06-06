/**
 * @file cognito.js
 * This is the cognito reducer for the TMS application
 */

export const CognitoState = {
  LOGGED_OUT: 'LOGGED_OUT',
  AUTHENTICATED: 'AUTHENTICATED',
  LOGGING_IN: 'LOGGING_IN',
  LOGGED_IN: 'LOGGED_IN',
  NEW_PASSWORD_REQUIRED: 'NEW_PASSWORD_REQUIRED',
  MFA_REQUIRED: 'MFA_REQUIRED',
  EMAIL_VERIFICATION_REQUIRED: 'EMAIL_VERIFICATION_REQUIRED',
  CONFIRMATION_REQUIRED: 'CONFIRMATION_REQUIRED',
};


const defaultState = {
  isAuthenticated: false,
  isAuthenticating: true,
  state: CognitoState.LOGGED_OUT,
  user: null
}

const cognito = (state = defaultState, action) => {
  switch (action.type) {
    case 'AUTHENTICATION_ACTION':
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      };
    default:
      return state;
  }
}

export default cognito;
