const bodyParser = require("body-parser")
const tools = require ('./tools.js')

const express = require('express')
const hbs = require("hbs")
const { response, request } = require("express")
const app = express()

hbs.registerPartials(__dirname + '/views/partials',function(err){})
app.set('view engine','hbs')
app.set('views',__dirname+'/views')
app.use(express.static(__dirname+'/public'))

app.use(express.urlencoded({
  extended : true
}))

app.use(express.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

let notes = [
    {
        id: 1,
        content: "HTML es sencillo",
        date: "2022-04-25T17:30:31.098Z",
        important: true
      },
      {
        id: 2,
        content: "El navegador puede ejecutar sólo JavaScript",
        date: "2022-04-25T17:40:31.098Z",
        important: false
      },
      {
        id: 3,
        content: "GET y POST son los métodos más importantes de HTTP",
        date: "2022-04-25T17:50:31.098Z",
        important: true
      }
]

app.get('/', (request, response) => {
  response.render("index.hbs")
})

app.get('/notes', (request, response) => {
  response.json(notes)
})

app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  

  if (note) {
    response.json(note)
  } else {
    response.status(404).send('<img src="https://igualdad.ine.mx/wp-content/uploads/2019/03/404-error-img.jpg"/>')
  }})

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/notes', (request, response) => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n=>n.id)):0
    const note = request.body
    note.id=maxId +1
    notes=notes.concat(note)
    response.json(note)
  })

  app.post("/create_note", (request,response)=>{
    console.log(request.body.title)
    console.log(request.body.bodyr)
    tools.addNote(title, body)
    const val = true ? response.redirect("/list_notes") : window.alert("AHH")
  })

  
  app.get("/list_notes",(request,response)=>{
    let notes =tools.loadNotes()
    console.log(notes)
    response.render("list_notes.hbs",{ notes })
  })

  
  app.get("/add_Note", (request, response) => {
    response.render("add_Note");
  });
  
  
  app.post("/Note2Add", (request, response) => {
    console.log("funcion para crear nota post");
    tools.addNote(request.body.title2Save, request.body.body2Save);
    response.redirect('/list_notes');
  });

  app.get("/Editar:title",(request, response) =>{
    let title = request.params.title;
    const notes = tools.loadNotes();
    const note = notes.find((note) => note.title === title);
    response.render("edit", {note});
  })

  app.get("/delete_note/:title", (request,response)=>{
    
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})