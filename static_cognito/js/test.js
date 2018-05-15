const listArticlesQuery = `
{
  articles {
    id
    author_id
    link
  }
}`

const newArticleQuery = `
mutation ($title: String!, $link: String!){
  createArticle(article: {
    link: $link,
    title: $title
  }) {
    author_id
    id
    posted_at
    link
    title
  }
}`
function testPage () {
  document.getElementById('buttonGet').addEventListener('click', () => {
    withToken().then(token => {
      return fetch(`${apiGPrefix}test`, {
        method: 'get',
        headers: new Headers({
          'Accept': 'application/json',
          'Authorization': token
        })
      })
    }).then(response => {
      if (response.status === 200) { return response.json() }
      console.log(response)
      throw new Error(`Bad status code ${response.status}`)
    }).then(respObject => {
      document.getElementById('output').innerHTML = JSON.stringify(respObject, null, 2)
    }).catch(err => {
      console.log('Sad days: ' + err)
    })
  })

  document.getElementById('buttonListArticles').addEventListener('click', () => {
    gqlQuery(listArticlesQuery, {}, true).then(respObject => {
      document.getElementById('output').innerHTML = JSON.stringify(respObject, null, 2)
    }).catch(err => {
      console.log('Sad days: ' + err)
    })
  })

  document.getElementById('buttonCreateArticle').addEventListener('click', () => {
    gqlQuery(
      newArticleQuery,
      {
        title: 'Test Article',
        link: 'https://read.acloud.guru/'
      },
      true
    ).then(respObject => {
      document.getElementById('output').innerHTML = JSON.stringify(respObject, null, 2)
    }).catch(err => {
      console.log('Sad days: ' + err)
    })
  })
}
