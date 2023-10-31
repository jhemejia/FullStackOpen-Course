import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import ContactsList from './components/ContactsList'
import FilterPhoneBook from './components/FilterPhoneBook'
import PersonsService from './services/PersonsService'
import './app.css'


const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const initialState = {name: "", number:""}
  const [newContact, setNewContact] = useState(initialState)
  const [filter, setFilter] = useState("")
  
  //init services
  const personsService = new PersonsService()

  //call the server and get the persons
  useEffect(()=>{
    personsService.getAllPersons().then(res=>setPersons(res))
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
    const contactData = {
      id: persons.length +1 ,
      number: newContact.number,
      name: newContact.name
    }

    if(persons.some(contact=> contact.name === newContact.name)) {
      const contactFound = persons.find(contact=> contact.name === newContact.name)
      handlePersonUpdate(contactFound.id, newContact)
    } else {
      setPersons([...persons, contactData])
      personsService.createNewPerson(contactData)
      setNewContact(initialState)
    }  
  }
  //handleInput for Filter component
  const handleFilterInput = (e)=>{
    e.preventDefault()
    setFilter(e.target.value)
  }

  //handle delete person from phonebook
  const handleDeletePerson = (person)=>{
    const confirmation = confirm(`Do you want to delete ${person.name}?`)
    if(confirmation){
      //delete the person by id
     const response = personsService.deletePerson(id)
     if(response.status===200){
       handleSetNotification("Success", response.message) 
       //get All persons again
       personsService.getAllPersons().then(res=>setPersons(res))
     } else {
      handleSetNotification("Error", response.message)
     }
    }
  }

  // function to handle contactUpdate
  const handlePersonUpdate = (id, person)=>{
    const confirmation = confirm(`${person.name} is already added to phonebook, do you want to replace the old number with a new one?`)
    if(confirmation){
      //delete the person by id
      personsService.updatePerson(id, person)
      //get All persons again
      personsService.getAllPersons().then(res=>setPersons(res))
    }
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
          handleDeletePerson={handleDeletePerson}
          />
    </div>
  )
}

export default App