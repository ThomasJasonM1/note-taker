const express = require("express");
const path = require("path");
const notes = require('./db/db.json');

const app = express();
const PORT = 3001;
let id = notes.length;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req.headers.host);
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get('/public/assets/js/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/assets/js/index.js"));
});

app.get('/assets/css/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/assets/css/styles.css"));
});

app.get('/api/notes', (req, res) => {
    return res.json(notes);
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = notes.length;

    let promises = [ 
        notes.forEach(note => {
            if (note.id === newNote.id) {
                newNote.id ++;
            }
        }),
        notes.push(newNote)];
    
    Promise.all(promises)
    .then(() => {
        return res.json(notes);
    })
});

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;

    new Promise(resolve => {
        resolve(notes.splice(notes.findIndex(n => n.id == id),1));
    }).then(() => {
        return res.json(notes);
    })
    
})

app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
