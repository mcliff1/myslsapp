function gqlQuery (query, variables, authenticated) {
  var target = `${apiGPrefix}readgql`
  if (authenticated) { target = `${apiGPrefix}gql` }
  return buildHeaders().then(headers => {
    return fetch(target, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({query: query, variables: variables}),
      headers: headers
    })
  }).then(response => {
    if (response.status === 200) { return response.json() }

    console.log(response)
    throw `Bad status code ${response.status}`
  }).catch(err => {
    console.log('Sad days: ' + err)
  })
}

function buildHeaders() {
  return withToken().then(token => {
    return new Headers({
      'Accept': 'application/json',
      'Authorization': token
    })
  }).catch(err => {
    return new Headers({
      'Accept': 'application/json'
    })
  })
}
