import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  folder: {
    type: String,
    default: "General"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Note = mongoose.model('Note', noteSchema)

export default Note
