const express = require("express");
const path = require("path");
const notes = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get('/public/assets/js/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/assets/js/index.js"));
});

app.get('/assets/css/', (req, res) => {
    res.sendFile(path.join(__dirname, ".public/assets/css/styles.css"));
});


app.post('/api/notes', (req, res) => {
    console.log(req.body);
    //notes.push()
});

app.get('/api/notes', (req, res) => {
    return res.json(notes);
});

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
