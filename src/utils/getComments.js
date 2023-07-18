const getComments = async (permalink) =>
  fetch(`https://api.reddit.com${permalink}`)
    .then((response) => response.json())
    .then((json) => json[1].data.children)
    .catch((err) => err)

const loadMoreComments = async (children, permalink) =>
  await Promise.all(
    children.map(async (child) => await getComments(permalink + child))
  )

export { getComments, loadMoreComments }
