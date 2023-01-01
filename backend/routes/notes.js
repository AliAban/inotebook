const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser"); //middleWare fetchuser to the the user data
const Note = require("../models/Note") // Note schema
const {
    body,
    validationResult
} = require('express-validator');

//ROUTE 1 :Get all notes using GET "/api/auth/fetchAllNotes"
router.get("/fetchAllNotes", fetchUser, async (req, res) => {

    try {
        const notes = await Note.find({
            user: req.user.id
        });
        res.json(notes);

    } catch (error) {
        res.status(500).send("some error occured")
    }
})


//ROUTE 2 :Add a note using GET "/api/notes/addNote"
router.get("/addNote", fetchUser, [
        body("title", "Enter a Title").isLength({
            min: 5
        }),
        body("description", "Enter atleast 5 characters").isLength({
            min: 5
        })
    ],
    async (req, res) => {

        try {
            //check for errors in input fields 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            //destructuring data from req.body
            const {
                title,
                description,
                tag
            } = req.body;

            //creates a note in the notes collections in db
            const note = await Note.create({
                user: req.user.id,
                title,
                description,
                tag
            })
            res.json(note);
            console.log("note added successfully !")

        } catch (error) {
            res.status(500).send("some error occured")
        }
    })


//ROUTE 3 :updat a note using put : "/api/notes/updateNote/:id"
router.put("/updateNote/:id", fetchUser,
    async (req, res) => {

        try {

            //destructuring data from req.body
            const {
                title,
                description,
                tag
            } = req.body;

            //create a new note
            const newNote = {};

            //if data is available then add to the newNote object
            if (title) {
                newNote.title = title
            };
            if (description) {
                newNote.description = description
            };
            if (tag) {
                newNote.tag = tag
            };


            //find note to be updated
            let note = await Note.findById(req.params.id);

            //if note note found 
            if (!note) {
                return res.status(404).send("Not found")
            }

            // checking if user id in the db is same as the user id from req.user
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }

            // find the note and update useing findByIdAndUpdate(), id takes filter, update and new
            // You should set the new option to true to return the document after update was applied.
            note = await Note.findByIdAndUpdate(req.params.id, newNote, {
                new: true
            })

            res.json({
                note
            })


        } catch (error) {
            res.send("Internal server error!");
        }
    }
)


//ROUTE 4 : Deleting a note using DELETE "/api/notes/deleteNote"
router.delete("/deleteNote/:id", fetchUser,
    async (req, res) => {

        try {

            //find the note to be deleted
            let note = await Note.findById(req.params.id);

            //if note not found
            if (!note) {
                return res.status(404).send("Not found")
            }

            //check if the user id is same as the userid in the db
            if (note.user.toString() !== req.user.id) {
                return res.status(404).send("Not authorized");
            }

            //find and delete
            note = await Note.findByIdAndDelete(req.params.id);
            res.json({
                "success": "Note has been deleted",
                "note": note
            });

        } catch (error) {
            res.send("internal server error")
        }
    }
)

module.exports = router;