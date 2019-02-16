const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

const usersRoute = require('./api/routes/users');
const groupsRoute = require('./api/routes/groups');
const authRoute = require('./api/routes/auth');


app.use(morgan('dev'));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS'){
		req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use('/users', usersRoute);
app.use('/groups', groupsRoute);
app.use('/auth', authRoute);
app.use((req, res, next) =>{
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	});
});



module.exports = app;