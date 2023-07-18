const getModhash = () =>
  fetch('https://api.reddit.com/api/me.json', { cache: 'no-cache' })
    .then((response) => response.json())
    .then((json) => json.data.modhash)
    .catch((err) => err)

// Helper function to build URL with query parameters
const buildURL = (baseURL, queryParams) => {
  const url = new URL(baseURL)
  Object.keys(queryParams).forEach((key) =>
    url.searchParams.append(key, queryParams[key])
  )
  return url
}

// sends vote to Reddit api
const sendVote = async (id, dir) => {
  const modhash = await getModhash()
  if (!modhash) return

  const queryParams = {
    dir,
    id,
    rank: 2,
    uh: modhash,
  }

  const url = buildURL('https://www.reddit.com/api/vote.json', queryParams)

  const response = await fetch(url, {
    method: 'POST',
  })
  return response.json()
}

// sends a reply to a post
const sendReply = async (replyId, text) => {
  const modhash = await getModhash()
  const queryParams = {
    api_type: 'json',
    text,
    thing_id: replyId,
    uh: modhash,
  }

  const url = buildURL('https://www.reddit.com/api/comment.json', queryParams)

  const response = await fetch(url, {
    method: 'POST',
  })

  return response.json()
}

const savePost = async (id, action) => {
  const modhash = await getModhash()
  const queryParams = {
    id,
    uh: modhash,
  }

  const url = buildURL(`https://www.reddit.com/api/${action}.json`, queryParams)

  const response = await fetch(url, {
    method: 'POST',
  })

  if (response.ok) {
    return { success: true }
  } else {
    const error = await response.text()
    return { error }
  }
}

export { getModhash, sendVote, sendReply, savePost }
