let mongoose = require('mongoose');


let ticketSchema = mongoose.Schema({
    Name: String,
    Date: String,
    Email: String,
    Age: Number,
    Address: String,
    Description: String,
    ComputerInfo: String,
    TicketNotes: String, 
})

let Ticket = module.exports = mongoose.model('Ticket', ticketSchema);

