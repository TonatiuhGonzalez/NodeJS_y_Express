const { notEqual } = require('assert')
const fs = require('fs')
const { title } = require('process')

const addNote = function(title, body){
    console.log("El título de la nota ", title)
    console.log("El cuerpo de la nota ", body)
    const notes = loadNotes()
    const maxID = notes.length > 0 ? Math.max(...notes.map(n=>n.id)):0
    console.log("ID: " + maxID)
    const duplicateNote = notes.find((note)=> note.title === title)
    if(!duplicateNote){
        id = maxID+1
        notes.push(
            {
                id: id,
                title: title,
                body: body
            }
        )
        saveNotes(notes)
        console.log("notas creadas")
        return true
    }
    else{
        console.log("error al crear nota")
        return false
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json",dataJSON)
}

const listNotes = function(){
    const notes1 = loadNotes()
    notes1.forEach((notes1)=>{
        console.log(notes1.title)
        console.log(notes1.body)
    })
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return[]
    }
}

const removeNote = function(id){
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.id != id);
      saveNotes(notesToKeep);
}

const readOneNote = function(title){
    const notes = loadNotes()
    const noteFound = notes.find((notes)=>notes.title===title)
    if(notes){
        console.log("Título: "+noteFound.title+" -","Nota: "+noteFound.body)
    }
    else{
        console.log('Nota no encontrada')
    }
}

const updateNote = function (id, updateTitle, updateBody) {
    const notes = loadNotes();
    let ids= Number(id)
    let note = notes.findIndex((note) =>note.id === ids);
    newnote =
    notes.splice(note, 1, {id:ids, title: updateTitle, body: updateBody});
    saveNotes(notes);
  };

module.exports = {
    addNote:addNote, 
    loadNotes:loadNotes,
    listNotes:listNotes,
    removeNote:removeNote,
    readOneNote:readOneNote,
    updateNote:updateNote
}