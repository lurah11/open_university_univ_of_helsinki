const express = require('express');
const morgan = require('morgan')

const app = express() 
app.use(express.json())
const PORT = 3001 

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//create new custom morgan token to hold the data 
morgan.token('data',(req,res)=>JSON.stringify(req.body))

//create custom morgan format 
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))





app.get('/',(request,response)=>{
    response.send('<h1>Herro Warudo ( Hello World )</h1>')
})

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/info',(request,response)=>{
    content1 = `Phonebook has info for ${persons.length} people`
    currDate = new Date()
    response.send(`<div><p>${content1}</p><p>${currDate}</p></div>`)
})


app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find((person)=>person.id===id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.post('/api/persons',(request,response)=>{
    console.log(request.body)
    const newID = parseInt(Math.random()*10000)
    const name = request.body["name"]
    const number = request.body["number"]
    const duplicateID = persons.find((person)=>person.id===newID)
    const duplicateName = persons.find((person)=>person.name===name)
    if (duplicateID) {
        response.send('<h3>The ID is coincidentally the same with the someone it database, please resend it</h3>')
    }
    else if (!(name && number)) {
        response.json({"error":"either name or number is missing"})
    }
    else if (duplicateName) {
        response.json({"error":"Name must be unique"})
    }
    else {
        const newPerson = {
            id:newID,
            name:name,
            number:number,
        }
        persons = persons.concat(newPerson)
        response.send(`<h3>New Person with name ${newPerson.name} and ID ${newPerson.id} has been added <h3>`)
    }
})





app.listen(PORT)

