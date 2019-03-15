const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');



const PORT = process.env.PORT || 8000;



app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

//Add 404 error handler
app.use(function (req,  res, next) {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

//Redirect to 404 page
app.use(function(err, req, res, next) {
    if (err.status == 404) {
        //res.redirect('/404.html');
        res.send('Error!!! Page not found...')
    };
});

require('./routes/router.js')(app);

app.listen(PORT, function() {
    console.log('Binary Software Solutions listening on port', PORT);
});