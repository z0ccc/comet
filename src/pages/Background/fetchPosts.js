import { readStorage } from '../../utils/storage'

// https://hn.algolia.com/api/v1/search?query=https://hn.algolia.com/&restrictSearchableAttributes=url&typoTolerance=false

const YOUTUBE_BASE = 'www.youtube.com/watch?v='

const fetchPosts = async (url) => {
  const hidePosts = await readStorage('hidePosts')

  const youtubeIdIndex = url.indexOf(YOUTUBE_BASE)
  const isYoutube = youtubeIdIndex !== -1

  const cleanedUrl = cleanUrl(url)

  let responses

  if (isYoutube) {
    const youtubeId = getYoutubeId(youtubeIdIndex, url)
    responses = [await fetchSearchApi(youtubeId)]
  } else {
    responses = await Promise.all([
      fetchSearchApi(cleanedUrl),
      fetchSubmitApi(cleanedUrl),
    ])
  }

  return processResponses(responses, cleanedUrl, isYoutube, hidePosts)
}

const fetchSearchApi = async (searchString) =>
  fetch(
    `https://www.reddit.com/search.json?q=url%3A%27${searchString}%27&include_over_18=on&sort=top&type=link`
  )
    .then((response) => response.json())
    .catch((err) => err)

const fetchSubmitApi = async (url) =>
  fetch(`https://www.reddit.com/submit.json?url=${cleanUrl(url)}`)
    .then((response) => response.json())
    .catch((err) => err)

// Sanitizes URL by removing http and https protocols
const cleanUrl = (url) => {
  const urlNoSlash = url.endsWith('/') ? url.slice(0, -1) : url
  const urlNoProtocol = urlNoSlash.replace(/(^\w+:|^)\/\//, '')
  const urlNoHash = urlNoProtocol.split('#')[0]
  return urlNoHash
}

// Extracts Youtube ID from a URL
const getYoutubeId = (youtubeIdIndex, url) => {
  return url.indexOf('&') === -1
    ? url.substring(youtubeIdIndex + YOUTUBE_BASE.length)
    : url.substring(youtubeIdIndex + YOUTUBE_BASE.length, url.lastIndexOf('&'))
}

// Process the fetch response, filter and reduce posts
const processResponses = (responses, cleanedUrl, isYoutube, hidePosts) => {
  let posts = responses
    .filter(
      (response) =>
        response.kind === 'Listing' && response.data.children.length > 0
    )
    .reduce((acc, val) => acc.concat(val.data.children), [])
    .reduce((acc, val) => acc.concat(val.data), [])
    .filter((post) => post.num_comments >= (hidePosts ? 1 : 0))

  if (!isYoutube) {
    posts = posts.filter((post) => cleanUrl(post.url) === cleanedUrl)
  }

  posts = [...new Map(posts.map((post) => [post.id, post])).values()]

  posts = posts.sort(compareComments)

  return posts
}

// Compare function for sorting posts based on number of comments
const compareComments = (a, b) => b.num_comments - a.num_comments

export default fetchPosts
