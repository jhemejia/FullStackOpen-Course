import React from 'react'

const ContactsList = ({persons, filter, handleDeletePerson}) => {

  const displayPersonsArray = filter != "" ? persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase())) : persons;
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {displayPersonsArray?.map(person=>{
            if(person) return <li key={person.id} style={{display:"flex",width:"350px",alignContent:"start",justifyContent:"space-between"}}>{person.name}: {person.number} <button onClick={()=>handleDeletePerson(person)}>Delete</button></li>
        })}
      </ul>
    </div>
  )
}

export default ContactsList
