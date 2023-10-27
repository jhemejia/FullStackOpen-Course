import React from 'react'

const ContactForm = (props) => {
    const {
        newContact,
        handleValueChange,
        handleSubmit
    } = props
  return (
    <div>
        <h2>Add a New Number:</h2>
      <form action="none" onSubmit={handleSubmit}>
        <div>
          name: <input value={newContact?.name} name="name" onChange={handleValueChange} required/>
        </div>
        <div>
          phone: <input value={newContact?.phone} name="phone" onChange={handleValueChange} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
