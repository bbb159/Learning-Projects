var request = require('request')
var colors = require('./colors')
var config = require('./config')

module.exports = {
  callMarvelApi: (req) => {
    
    const marvelPath = req.path.replace('/marvel', '')
    const url = `${config.MARVEL_API_URL}${marvelPath}?apikey=${req.query.apikey}&hash=${req.query.hash}&ts=${req.query.ts}&orderBy=${req.query.orderBy ? req.query.orderBy : ''}`
    const { headers, method } = req
  
    delete headers['accept-encoding'] // remove encoding to avoid problems with gzip
  
    console.info(method, url)
  
    return new Promise((resolve, reject) => request({ url, headers }, (error, res, body) => {

      console.info(colors.getColorFromStatus(res.statusCode) + res.statusCode, colors.default + url)  
      
      if (error) reject({ res, error })
      
      resolve(res)
    }))
  }
}