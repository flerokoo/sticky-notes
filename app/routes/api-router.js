import mg from "mongoose";
import express from 'express';



export default function configureApiRouter(router, dbconn) {

    let Note = dbconn.model("Note")

    router.get("/notes", (req, res) => {        
        Note.find().then(notes => {            
            res.end(JSON.stringify(notes));
        }).catch(reason => {
            res.writeHead(500, reason);
            res.end();
        });
    })

    router.get("/note/:id", (req, res) => {        
        Note.findOne({ _id: req.params.id }).then(note => {
            res.end(JSON.stringify(note));
        }).catch(err => {
            res.write(500, err);
            res.end();
        });
    })

    router.post("/note", (req, res) => {
        Note.create({
            title: req.body.title,
            content: req.body.content
        }).then(result => {
            res.status(200).end();
        }).catch(err => {
            res.status(500).end();
        })
    })


    return router;
}