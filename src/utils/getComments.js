const getComments = async (permalink) => {
  const response = await (
    await fetch(`https://api.reddit.com${permalink}`)
  ).json()

  if (response[1].data.children.length) {
    return response[1].data.children
  }
}

const loadMoreComments = async (children, permalink) =>
  await Promise.all(
    children.map(
      async (child) =>
        await getComments(permalink.replace(/([^/]+)\/?$/, '') + child)
    )
  )

export { getComments, loadMoreComments }
