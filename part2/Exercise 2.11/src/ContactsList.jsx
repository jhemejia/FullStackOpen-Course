import React from 'react'

const ContactsList = ({persons, filter}) => {

  const displayPersonsArray = filter != "" ? persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase())) : persons;
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {displayPersonsArray.map(person=>{
            if(person) return <li key={person.id}>{person.name} {person.number}</li>
        })}
      </ul>
    </div>
  )
}

export default ContactsList
