// Modules importing
const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();

// Middleware
app.use(express.json());
app.use('/', express.static('./public'));
app.use('/api/cart', cartRouter);

// Base routes
app.get('/api/products', (req, res) => {
    fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}));
            // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});
app.get('/api/inCart', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({result: 0, text: err}));
            // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

// Server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening ${port} port`);
});

// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE