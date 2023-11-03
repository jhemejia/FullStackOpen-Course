let  persons = require('./persons.json')
const express = require('express')
const app = express();
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
app.get('/info', (request, response) => {
    const length = persons.length
    const date = new Date().toUTCString()
    const info = `<p>Phonebook has info for ${length} people.</p><br/><p>${date}</p>`;

    response.send(info)
  })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
    const contains = persons.some((p)=>p.name == body.name)
    if(contains){
        return response.status(400).json({
            error:'name must be unique'
        })
    }
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })  