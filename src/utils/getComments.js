const getComments = async (permalink) => {
  const response = await fetch(`https://api.reddit.com${permalink}`)
  const jsonResponse = await response.json()

  if (jsonResponse[1].data.children.length) {
    return jsonResponse[1].data.children
  }
}

const loadMoreComments = async (children, permalink) =>
  await Promise.all(
    children.map(async (child) => await getComments(permalink + child))
  )

export { getComments, loadMoreComments }
