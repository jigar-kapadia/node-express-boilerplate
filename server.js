const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('./src/config/db.config');
const morganLogger = require('morgan');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTSecretKey;


//CORS handling
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const testRouter = require('./src/routes/test.route');
const customerRoute = require('./src/routes/customer.route');
const userRoutes = require('./src/routes/user.routes');
app.use('/api/test', validateUser, testRouter);
app.use('/api/customer', customerRoute);
app.use('/api/user', userRoutes);

//swagger setup
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./src/config/swagger-test.json');
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

//mongo db connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(morganLogger('dev'));

// test route
app.get('/', (req, res) => res.send('App is working'))


//cors
const cors = require('cors');
app.use(cors());

//for parsing all request to application/json
app.use(function (req, res, next) {
    res.header("Content-Type", 'application/json');
    next();
});

// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else {
        res.status(500).json({ message: "Something looks wrong :( !!!" });
    }

});

//Test server 
app.listen(port, (req, res) => {
    console.log('Server started at port : '+ port);
})

//Validate JWT for all Request
function validateUser(req, res, next) {
    jwt.verify(req.headers['access-token'], secretKey, function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
    
  }


// OpenAPI specification
// const openApi = require('express-openapi-validator').OpenApiValidator;

// new OpenApiValidator({
//     apiSpec : './openapi.yaml'
// }).install(app);


// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
// app.use(function (req, res, next) {
//     let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

