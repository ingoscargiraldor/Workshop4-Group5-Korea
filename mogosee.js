const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin@workshop.naubp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => {
        console.log('Conectado a MongoDB Atlas usando Mongoose');
    })
    .catch(err => {
        console.error('Error conectando a MongoDB Atlas:', err);
    });
