
import { prisma } from "../db.js"

const getNotes = async (req,res) => {
  try {   

    const notes = await prisma.note.findMany({
      where: {
        userId: req.user.id
      }
    })
    
    res.json(notes)
     
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({error: error.message})
  }
}

const getNoteById = async (req,res) => {
  try {
    const { id } = req.params
    
    const note = await prisma.note.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id
      }
    })

    if (!note) {
      return res.status(404).json({error:'note not found'})
    }

    res.send(note)
     
  } catch (error) {
    res.status(500).json({error: error.message})
    console.log(error.message)

  }
}

const createNote = async (req,res) => {
  try {
    const { title, content } = req.body

    const newNote = await prisma.note.create({
      data: {
        title: title,
        content: content,
        user:{
          connect: {
            id: req.user.id
          }
        }
      }
    })

    if (!newNote) {
      return res.status(500).json({error:'error trying to create note'})
    }

    res.json(newNote)
    
  } catch (error) {
    res.status(500).json({error: error.meta.cause})
    console.log(error.meta.cause)

  }
}

const editNote = async (req,res) => {
  try {
    const { id } = req.params
    const editData = req.body

    const editedNote = await prisma.note.update({
      where: {
        id: parseInt(id),
        userId: req.user.id
      },
      data: editData
    })

    res.json(editedNote)

  } catch (error) {

    if(error.code === 'P2025'){ // record to update not found
      console.log(error.meta)
      return res.status(404).json({error:'note to update not found'})
    }

    res.status(500).json(error.message)
  }
}

const deleteNote = async (req,res) => {
  try {
    const { id } = req.params
    
    const deletedNote = await prisma.note.delete({
      where: {
        id: parseInt(id),
        userId: req.user.id
      }
    }) 

    res.json(deletedNote)
    
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({error: error.meta.cause})
    }

    res.status(500).json({error: error})
    console.log(error)
  }
}

export {
  getNotes,
  getNoteById,
  createNote,
  editNote,
  deleteNote
}
