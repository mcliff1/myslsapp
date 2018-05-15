myToken().then(token => {
  if (token) {
    document.getElementById('signUp').style.display = 'none'
  }
}).catch(err => {})

document.getElementById('buttonSignUp').addEventListener('click', () => {
  const newAttributes = [
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(
      {
        Name: 'name',
        Value: document.getElementById('fullname').value
      }
    ),
    new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(
      {
        Name: 'email',
        Value: document.getElementById('email').value
      }
    )
  ]

  const newUser = new Promise((resolve, reject) => {
    getCurrentPool().signUp(
      document.getElementById('newUsername').value,
      document.getElementById('newPassword').value,
      newAttributes, null, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.user)
        }
      }
    )
  }).then(user => {
    console.log('Successful signup')
    console.log(user)
    document.getElementById('signUp').style.display = 'none'
  }).catch(err => {
    alert('Signup failed! ' + err)
  })
})

document.getElementById('buttonLogin').addEventListener('click', () => {
  signIn({
    Username: document.getElementById('username').value,
    Password: document.getElementById('password').value
  }).then(result => {
    console.log('Successful login')
    console.log(result)
    window.location.pathname = '/'
  }).catch(err => {
    alert('Login failed! Uhoh ' + err)
  })
})
