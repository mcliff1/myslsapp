function signIn (params) {
  var authDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(params)
  var userData = {
    Pool: getCurrentPool(),
    Username: document.getElementById('username').value
  }
  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData)
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: result => { resolve(result) },
      onFailure: err => { reject(err) }
    })
  })
}

function signOut () {
  var me = getCurrentUser()
  if (me !== null) me.signOut()
}

function getCurrentPool () {
  return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(cognitoSettings)
}

function getCurrentUser () {
  return getCurrentPool().getCurrentUser()
}

function decodeUserInfo (token) {
  return JSON.parse(
    window.atob(
    token.split('.')[1]
      .replace('-', '+')
      .replace('_', '/')
    )
  )
}

function getUserToken (currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession(function (err, session) {
      if (err) {
        reject(err)
        return
      }
      resolve(session.getIdToken().getJwtToken())
    })
  })
}

function myToken () {
  return new Promise((resolve, reject) => {
    var me = getCurrentUser()
    if (me === null) {
      reject('No user found')
    } else {
      resolve(getUserToken(me))
    }
  })
}

function withToken () {
  return myToken().catch(err => {
    return Promise.reject('No user found')
  })
}
