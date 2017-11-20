let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
const router = express.Router();
let Ticket = require('../models/ticketModel')

router.get('/add', (req,res) => {
    res.render('add_ticket');
});


router.get('/tickets', (req,res) => {
    Ticket.find({}, (err,tickets) => {
        if(err) {
            console.log('There was an error');
        } else {
            res.render('tickets', {
                tickets:tickets
            })
        }
    })
});
        
router.get('/view/:id', (req,res) => {
    Ticket.find({_id:req.params.id}, (err,tickets) => {
        if(err) {
            console.log(err);
        } else {
            res.render('view_ticket', {
                tickets:tickets
            })
        }
    })
});



router.get('/confirm/:id', (req,res) => {
    let tickID = req.params.id;
    res.render('confirm', {
        ticket:tickID
        })
    });

router.post('/confirm/:id', (req,res) => {
        Ticket.findByIdAndRemove({ _id: req.params.id}, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/tickets');
            }
        });
    });
        



router.post('/add', (req,res) => {
    let tickBody = req.body;
    let newTicket = new Ticket({
        Name: tickBody.Name,
        Date: tickBody.Date,
        Email: tickBody.Email,
        Age: tickBody.Age,
        Address: tickBody.Address,
        Description: tickBody.Description,
        ComputerInfo: tickBody.ComputerInfo,
        TicketNotes: tickBody.TicketNotes
    });

    newTicket.save((err,tickets) => {
        if(err) {
            console.log('There has been an error');
        } else {
            Ticket.find({}, (err,tickets) => {
                if(err) {
                    console.log('There was an error');
                } else {
                    res.render('tickets', {
                        tickets:tickets
                    })
                }
            })
           
        } 
    })
});

router.get('/edit/:id', (req,res) => {
    Ticket.findById(req.params.id, (err, ticket) => {
        res.render('edit_ticket',  {
            ticket:ticket
        });
    });
});


router.post('/delete/:id', (req,res) => {
    Ticket.findByIdAndRemove({ _id: req.params.id}, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/tickets');
        }
    });
});


router.post('/edit/:id', (req,res) => {
    let ticket = {};
    ticket.Name= req.body.Name;
    ticket.Date= req.body.Date;
    ticket.Email= req.body.Email;
    ticket.Age= req.body.Age;
    ticket.Address= req.body.Address;
    ticket.Description= req.body.Description;
    ticket.ComputerInfo= req.body.ComputerInfo;
    ticket.TicketNotes= req.body.TicketNotes;

    let query = {_id:req.params.id}

    Ticket.update(query, ticket, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/tickets');
        }
    })
});

router.get('/login/', (req,res) => {
    res.render('login')
});


router.post('/login',
passport.authenticate('local'),
function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.redirect('/users/' + req.user.username);
});



module.exports = router;