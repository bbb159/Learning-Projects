const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  default: '\x1b[0m'
}

module.exports = {
  ...colors,
  getColorFromStatus: (statusCode) => {
    const status = Number(statusCode)
    if (status > 199 && status < 299) return colors.green
    if (status > 299 && status < 399) return colors.yellow
    if (status > 399) return colors.red
    return colors.default
  }
}
