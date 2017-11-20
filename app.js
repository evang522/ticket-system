let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
let routes = require('./routes/routes');
let dbConnect = require('./db/dbcon');
let Ticket = require('./models/ticketModel');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json({ type: 'application/*+json' }));



app.use('/', routes);

app.get('/', (req,res) => {
    Ticket.find({}, (err,tickets) => {
        if(err) {
            console.log(err);
        } else {
            res.render('home', {
                tickets:tickets
            })
        }
    })
});

app.listen(80);