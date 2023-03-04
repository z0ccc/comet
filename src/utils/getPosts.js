const getPosts = async (url) => {
  const urls = getUrls(url)
  const redditUrls = [
    'https://api.reddit.com/submit?url=',
    'https://www.reddit.com/api/info.json?url=',
  ]

  const responses = await Promise.all(
    redditUrls
      .map((redditUrl) =>
        urls.map(async (url) => await (await fetch(redditUrl + url)).json())
      )
      .flat()
  )

  // https://hn.algolia.com/api/v1/search?query=https://hn.algolia.com/&restrictSearchableAttributes=url&typoTolerance=false

  const hidePosts = await readStorage('hidePosts')

  let posts = responses
    .filter(
      (response) =>
        response.kind === 'Listing' && response.data.children.length > 0
    )
    .reduce((acc, val) => acc.concat(val.data.children), [])
    .reduce((acc, val) => acc.concat(val.data), [])
    .filter((post) => post.num_comments >= (hidePosts ? 1 : 0))

  posts = posts.sort(compare)

  posts = [...new Map(posts.map((post) => [post.id, post])).values()]

  return posts
}

const getUrls = (url) => {
  const urls = [url]

  url.startsWith('https')
    ? urls.push(url.replace('https', 'http'))
    : urls.push(url.replace('http', 'https'))

  urls.forEach((url) => {
    url.endsWith('/') ? urls.push(url.slice(0, -1)) : urls.push(url + '/')
  })

  if (url.indexOf('www.youtube.com/watch?v=') !== -1) {
    urls.forEach((url) => {
      urls.push(url.replace('www.youtube.com/watch?v=', 'youtu.be/'))
    })
  }

  return urls
}

const readStorage = async (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], function (result) {
      resolve(result[key])
    })
  })
}

const compare = (a, b) => b.num_comments - a.num_comments

export default getPosts
