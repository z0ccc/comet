const convertDate = (timestamp) => {
  let diff = Date.now() - timestamp * 1000

  if (diff < 1000) {
    return 'just now'
  }

  diff /= 1000
  if (diff < 60) {
    return `${Math.trunc(diff)} second${diff < 2 ? '' : 's'}`
  }

  diff /= 60
  if (diff < 60) {
    return `${Math.trunc(diff)} minute${diff < 2 ? '' : 's'}`
  }

  diff /= 60
  if (diff < 24) {
    return `${Math.trunc(diff)} hour${diff < 2 ? '' : 's'}`
  }

  diff /= 24
  if (diff < 7) {
    return `${Math.trunc(diff)} day${diff < 2 ? '' : 's'}`
  }

  diff /= 7
  if (diff < 4) {
    return `${Math.trunc(diff)} week${diff < 2 ? '' : 's'}`
  }

  diff /= 4
  if (diff < 13) {
    return `${Math.trunc(diff)} month${diff < 2 ? '' : 's'}`
  }

  diff /= 12
  return `${Math.trunc(diff)} year${diff < 2 ? '' : 's'}`
}

export default convertDate
