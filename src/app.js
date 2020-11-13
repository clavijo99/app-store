const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express();


app.set('port', process.env.PORT || 3001);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(require('./routes/products.route'))


module.exports  = app;