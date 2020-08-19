const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const dbNotes = require("../db/db.json");

module.exports = function (app) {
    // Resources https://nodejs.org/api/fs.html || https://stackoverflow.com/questions/56711269/create-new-object-and-write-to-file-with-fs-writefile || https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js

    // GET route 
    app.get('/api/notes', function (req, res) {
        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            notes = JSON.parse(data);
            res.json(notes);
        });
    });

    // Resources https://stackoverflow.com/questions/56711269/create-new-object-and-write-to-file-with-fs-writefile || https://stackoverflow.com/questions/36856232/write-add-data-in-json-file-using-node-js
    // POST route
    app.post('/api/notes', function (req, res) {

        let notes = req.body;
        notes.id = uuidv4();

        let notesArr = [];

        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err)
            }
            notesArr = JSON.parse(data);
            notesArr.push(note);

            fs.writeFile('./db/db.json', JSON.stringify(notesArr), function (err) {
                if (err) {
                    console.log(err)
                }
                return res.json(notesArr);
            });
        });

    });

     // Delete route
};