const getVote = (likes) => {
  if (likes) return 1 // if upvote
  if (likes === false) return -1 // if downvote
  return 0 // if no vote
}

const getScore = (vote, voteType, score) => {
  if (vote === voteType) {
    return score - voteType
  } else if (vote + voteType === 0) {
    return score + voteType * 2
  }
  return score + voteType
}

export { getVote, getScore }
