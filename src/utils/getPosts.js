const getPosts = async (url) => {
  const urls = getUrls(url)

  const responses = await Promise.all(
    urls.map(
      async (url) =>
        await (await fetch('https://api.reddit.com/submit?url=' + url)).json()
    )
  )

  let posts = responses
    .filter(
      (response) =>
        response.kind === 'Listing' && response.data.children.length > 0
    )
    .reduce((acc, val) => acc.concat(val.data.children), [])
    .reduce((acc, val) => acc.concat(val.data), [])

  posts = posts.sort(compare)

  // posts = [...new Map(posts.map((item) => [item.data.id, item])).values()]

  console.log(posts)

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

const compare = (a, b) => b.num_comments - a.num_comments

export default getPosts
