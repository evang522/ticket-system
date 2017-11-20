let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cusdat');
mongoose.connection.on('connected', (req,res) => {
    console.log('Database connection successful');
    console.log('Don\'t forget to tie your shoes')
});

