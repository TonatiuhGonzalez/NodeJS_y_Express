const { notEqual } = require('assert')
const fs = require('fs')
const { title } = require('process')

const addNote = function(title, body){
    console.log("El título de la nota ", title)
    console.log("El cuerpo de la nota ", body)
    const notes = loadNotes()
    const duplicateNote = notes.find((notes)=> notes.title === title)
    if(!duplicateNote){
        notes.push(
            {
                title:title,
                body:body
            }
        )
        //guardar en el archivo
        saveNotes(notes)
        const value = true
    }
    else{
        const value = false
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

const removeNote = function(title){
    const notes=loadNotes()
    const notesToKeep = notes.filter((notes) => notes.title != title)
    if(notes.length>notesToKeep.length){
        saveNotes(notesToKeep)
    }
    else{
        console.log("Nota no encontrada")
    }
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

const modifyNote = function(title,body){
    const notes = loadNotes()
    const noteToModify = notes.find((notes)=>notes.title===title)
    if(notes){
        const removeNote = notes.filter((notes)=>notes.title != title)
        saveNotes(removeNote)
        removeNote.push(
            {
                title:title,
                body:body
            }
        )
        saveNotes(removeNote)
    }
    else{
        console.log('Nota no encontrada')
    }
}

module.exports = {
    addNote:addNote, 
    loadNotes:loadNotes,
    listNotes:listNotes,
    removeNote:removeNote,
    readOneNote:readOneNote,
    modifyNote:modifyNote
}