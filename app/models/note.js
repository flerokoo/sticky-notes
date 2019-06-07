import mongoose from 'mongoose'


export function createNoteModel(dbconn) {
    let schema = mongoose.Schema({
        title: String,
        content: String
    })

    dbconn.model("Note", schema)
}