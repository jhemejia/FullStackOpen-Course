import { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import ContactsList from './ContactsList'
import FilterPhoneBook from './FilterPhoneBook'
import Axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const initialState = {name: "", phone:""}
  const [newContact, setNewContact] = useState(initialState)
  const [filter, setFilter] = useState("")
  
  //call the server and get the persons
  useEffect(()=>{
    Axios.get("http://localhost:3001/persons")
    .then((res)=>setPersons(res.data))
  },[])

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