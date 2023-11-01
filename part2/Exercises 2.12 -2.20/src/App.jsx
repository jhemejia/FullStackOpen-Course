import { useState, useEffect } from 'react'
import './app.css'
import ContactForm from './components/ContactForm'
import ContactsList from './components/ContactsList'
import FilterPhoneBook from './components/FilterPhoneBook'
import PersonsService from './services/PersonsService'
import Notification from './components/Notification'


const App = () => {
  const initialContactState = {name: "", number:""}
  const initialNotificationState = {type:"", text:""}

  const [persons, setPersons] = useState([]) 
  const [notification, setNotification] = useState(initialNotificationState)
  const [filter, setFilter] = useState("")
  const [newContact, setNewContact] = useState(initialContactState)

  //init services
  const personsService = new PersonsService()

  //effects
  useEffect(()=>{
    //call the server and get the persons
    personsService.getAllPersons().then(res=>setPersons(res))
  },[])
  useEffect(()=>{
    setTimeout(()=>setNotification(initialNotificationState),5000)
  },[notification])

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
      handleCreateNewPerson(contactData)
    }  
  }
  //handleInput for Filter component
  const handleFilterInput = (e)=>{
    e.preventDefault()
    setFilter(e.target.value)
  }
  
  //handle create new person
  const handleCreateNewPerson = async (contactData)=>{
      setNewContact(initialContactState)
      const response = await personsService.createNewPerson(contactData)
      if(response.status === 200){
        setNotification({type:"Success", text: response.message}) 
        //get All persons again
        personsService.getAllPersons().then(res=>setPersons(res))
      } else {
        setNotification({type:"Error", text: response.message}) 
     }
  }
  //handle delete person from phonebook
  const handleDeletePerson = async(person)=>{
    const confirmation = confirm(`Do you want to delete ${person.name}?`)
    if(confirmation){
      //delete the person by id
     const response = await personsService.deletePerson(person.id)
     if(response.status===200){
       setNotification({type:"Success", text: response.message}) 
       //get All persons again
       personsService.getAllPersons().then(res=>setPersons(res))
     } else {
      setNotification({type:"Error", text: response.message}) 
     }
    }
  }

  // function to handle contactUpdate
  const handlePersonUpdate = (id, person)=>{
    const confirmation = confirm(`${person.name} is already added to phonebook, do you want to replace the old number with a new one?`)
    if(confirmation){
      //update the person by id
      const response =  personsService.updatePerson(id, person)
      if(response.status===200){
        setNotification({type:"Success", text: response.message}) 
      //get All persons again
      personsService.getAllPersons().then(res=>setPersons(res))
     } else {
        setNotification({type:"Error", text: response.message}) 
     }
    }
  }

  // function to handle the notification type
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification notification={notification}/>
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