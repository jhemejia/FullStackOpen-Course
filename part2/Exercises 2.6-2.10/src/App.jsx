import { useState } from 'react'
import ContactForm from './ContactForm'
import ContactsList from './ContactsList'
import FilterPhoneBook from './FilterPhoneBook'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const initialState = {name: "", phone:""}
  const [newContact, setNewContact] = useState(initialState)
  const [filter, setFilter] = useState("")
  
  //function to handle change
  const handleValueChange = (e) => {
    e.preventDefault()
    //set the New Name to the value
    setNewContact({...newContact,[`${e.target.name}`]: e.target.value})
  }
  
  //function to handle the submit form 
  const handleSubmit = (e) => {
    e.preventDefault()

    if(persons.some(contact=> contact.name === newContact.name)) {
      alert(`${newContact.name} is already added to phonebook`)
    } else {
      const contactData = {
        id: persons.length +1 ,
        number: newContact.phone,
        name: newContact.name
      }
      setPersons([...persons, contactData])
      setNewContact(initialState)
    }  
  }
  //handleInput for Filter component
  const handleFilterInput = (e)=>{
    e.preventDefault()
    setFilter(e.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
        <FilterPhoneBook 
          filter={filter}
          handleFilterInput={handleFilterInput}
        />
        <ContactForm 
          newContact={newContact} 
          handleValueChange={handleValueChange}
          handleSubmit={handleSubmit}
         />
         <ContactsList 
          persons={persons} 
          filter={filter}
          />
    </div>
  )
}

export default App