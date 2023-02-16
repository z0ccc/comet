const getComments = async (permalink) => {
  const response = await (
    await fetch(`https://api.reddit.com${permalink}`)
  ).json()

  if (response[1].data.children.length) {
    return response[1].data.children
  }
}

export default getComments
