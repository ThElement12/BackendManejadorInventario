const mongoose = require('mongoose');

const URI = "mongodb+srv://admin:admin@cluster0.zdwsk.mongodb.net/inventario";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');

})