// Create web server 
// 1. Import express
const express = require('express');
const path = require('path');
const fs = require('fs');
// 2. Create an object of express
const app = express();
// 3. Create a port number
const port = 3000;
// 4. Create a middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
// 5. Create a route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/comments', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'comments.html'));
});
app.get('/comments-json', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'comments.json'), 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});
app.post('/comments-json', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'comments.json'), 'utf8', (err, data) => {
        if (err) throw err;
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(path.join(__dirname, 'data', 'comments.json'), JSON.stringify(comments), (err) => {
            if (err) throw err;
            res.send('Data has been saved');
        });
    });
});
// 6. Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));