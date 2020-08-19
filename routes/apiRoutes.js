const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const dbNotes = require("../db/db.json");

module.exports = function (app) {
    // Resources https://nodejs.org/api/fs.html 

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
                console.log(err);
            }
            notesArr = JSON.parse(data);
            notesArr.push(notes);

            fs.writeFile('./db/db.json', JSON.stringify(notesArr), function (err) {
                if (err) {
                    console.log(err);
                }
                return res.json(notesArr);
            });
        });

    });

    // Resources https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach || https://stackoverflow.com/questions/15287865/remove-array-element-based-on-object-property
    // Delete route
    app.delete("/api/notes/:id", function (req, res) {
        let noteId = req.params.id;
        fs.readFile('./db/db.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            const notesArr = JSON.parse(data);

            console.log(notesArr)

            const newNotesArr = notesArr.filter(item => item.id !== noteId);

            console.log("-------------")

            console.log(newNotesArr)

            fs.writeFile('./db/db.json', JSON.stringify(newNotesArr), function (err) {
                if (err) {
                    console.log(err)
                }
                return res.json(dbNotes);
            })

        });
    });

}