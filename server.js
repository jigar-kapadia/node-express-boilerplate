const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('./src/config/db.config');
const morganLogger = require('morgan');


//body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const testRouter = require('./src/routes/test.route');
app.use('/api/test', testRouter);

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

