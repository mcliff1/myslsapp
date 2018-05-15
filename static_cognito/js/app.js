const homepageArticlesQuery = `
{
  articles {
    id
    author_fullname
    author_id
    link
    posted_at
    title
  }
}`

function prettyTime (nd, s) {
  const o = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 1000 * 60,
    day: 24 * 60 * 1000 * 60,
    week: 7 * 24 * 60 * 1000 * 60,
    month: 30 * 24 * 60 * 1000 * 60,
    year: 365 * 24 * 60 * 1000 * 60
  };
  var r = Math.round,
    pl = function(v, n) {
      return (s === undefined) ? n + ' ' + v + (n > 1 ? 's' : '') + ' ago' : n + v.substring(0, 1)
    },
    ts = Date.now() - new Date(nd).getTime(),
    ii;
  for (var i in o) {
    if (r(ts) < o[i]) return pl(ii || 'm', r(ts / (o[ii] || 1)))
    ii = i;
  }
  return pl(i, r(ts / o[i]));
}

gqlQuery(homepageArticlesQuery, {}, false).then(respObject => {
  console.log(respObject)
  var listing = '';
  _.forEach(respObject.data.articles, item => {
    const age = item.posted_at * 1000 // convert seconds-since epoch to milliseconds-since-epoch
    listing += `
<tr id="${item.id}">
  <th scope="row"><a href="${item.link}">${item.title}</a>
  <a href="#article/${item.id}" class="commentLink">[comments]</a></th>
  <td>${item.author_fullname}</td>
  <td>${prettyTime(age)}</td>
</tr>`
  })
  document.getElementById('articleList').innerHTML = listing
}).catch(err => {
  console.log('Sad days: ' + err)
})

const oneArticleQuery = `
query Single ($article_id: String!) {
  article (id: $article_id) {
    title
    comments {
      commenter_fullname
      posted_at
      body
    }
  }
}`

window.onhashchange = () => {
  if (location.hash.startsWith('#article/')) {
    gqlQuery(
      oneArticleQuery,
      {article_id: location.hash.split('/')[1]},
      false
    ).then(result => {
      console.log(JSON.stringify(result, null, 2))
      return result.data.article
    }).then(result => {
      $('#articleModalLabel')[0].innerHTML = result.title
      var comments = ''

      _.forEach(result.comments, comment => {
        comments += `<div class="panel"><p>${comment.body}</p><p class="byline">By ${comment.commenter_fullname} ${prettyTime(comment.posted_at * 1000)}</p></div>`
      })
      $('#articleModalBody')[0].innerHTML = comments
      $('#articleModal').modal()
    })
    console.log("Feature time!")
  } else if (location.hash.startsWith('#new')) {
    $('#createArticleModal').modal()
  } else if (location.hash) {
    console.log("Hash...ish", location.hash);
  }
}

const newCommentQuery = `
mutation comm ($body: String!, $article: String!) {
  createComment(comment: {
    article_id: $article
    body: $body
  }) {
    posted_at
    body
  }
}`

document.getElementById('submitComment').addEventListener('click', () => {
  gqlQuery(
    newCommentQuery,
    {
      article: location.hash.split('/')[1],
      body: document.getElementById('commentContent').value,
    },
    true
  ).then(resp => {
    console.log(JSON.stringify(resp, null, 2))
    $('#articleModal').modal('hide')
    window.location = '/#'
  })
})

const newArticleQuery = `
mutation ($title: String!, $link: String!){
  createArticle(article: {
    link: $link,
    title: $title
  }) {
    author_fullname
    author_id
    id
    link
    posted_at
    title
  }
}`

document.getElementById('submitArticle').addEventListener('click', () => {
  gqlQuery(
    newArticleQuery,
    {
      title: document.getElementById('newArticleTitle').value,
      link: document.getElementById('newArticleLink').value,
    },
    true
  ).then(resp => {
    console.log(JSON.stringify(resp, null, 2))
    $('#createArticleModal').modal('hide')
    $('#articleList').prepend(`
<tr id="${resp.data.createArticle.id}">
  <th scope="row"><a href="${resp.data.createArticle.link}">${resp.data.createArticle.title}</a></th>
  <td>${resp.data.createArticle.author_fullname}</td>
  <td>${prettyTime(resp.data.createArticle.posted_at * 1000)}</td>
</tr>`)
    window.location = '/#'
  })
})
