import React from 'react'

const FilterPhoneBook = (props) => {
    const {
        filter,
        handleFilterInput
    } = props
  return (
    <div style={{display: "flex"}}>
        <strong>Filter:</strong> 
        <input type="text" value={filter}  onChange={handleFilterInput}/>
    </div>
  )
}

export default FilterPhoneBook
