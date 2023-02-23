const formatNumber = (number) =>
  Math.abs(number) > 9999
    ? `${(Math.sign(number) * (Math.abs(number) / 1000)).toFixed(0)}k`
    : `${Math.sign(number) * Math.abs(number)}`

export default formatNumber
