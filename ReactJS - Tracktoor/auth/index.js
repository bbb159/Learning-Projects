var bodyParser = require('body-parser')
var express = require('express')
var proxy = require('./proxy')
var colors = require('./colors')
var config = require('./config')

const app = express()
const authorizationHeader = `Bearer ${config.TOKEN}`

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST')
  res.header('Access-Control-Allow-Headers', 'accept, content-type, authorization')
  res.header('Access-Control-Expose-Headers','*')
  
  if ('OPTIONS' === req.method) res.sendStatus(200)
  else next()
})

function authenticate(body) {
  if (body.user !== config.USER) return { error: 'invalid_user' }
  if (body.password !== config.PASSWORD) return { error: 'invalid_password' }
  return {}
}

app.post('/login', (req, res) => {
  const authentication = authenticate(req.body)
  if (authentication.error) return res.status(404).send(authentication)
  return res.status(200).header('Authorization', authorizationHeader).send(config.PROFILE)
})

app.get('/marvel/*', (req, res) => {
  const authorized = req.headers.authorization === authorizationHeader
  if (!authorized) return res.sendStatus(401)
  return proxy.callMarvelApi(req)
    .then(response => res.set(response.headers).status(response.statusCode).send(response.body))
    .catch(result => res.status(result.res.statusCode).send(result.error))
})

app.listen(5000)

console.info(colors.yellow, 'Running at http://localhost:5000... \n', colors.default)