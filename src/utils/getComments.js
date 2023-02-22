const getComments = async (permalink) => {
  let response = await (
    await fetch(`https://api.reddit.com${permalink}`).catch()
  ).json()

  if (response[1].data.children.length) {
    return response[1].data.children
  }
}

const loadMoreComments = async (children, permalink) =>
  await Promise.all(
    children.map(async (child) => await getComments(permalink + child))
  )

export { getComments, loadMoreComments }
