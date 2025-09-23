import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: "040-1231244"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName, //määritellään uusi nimi
      number: newNumber // ja numero
    }
    if (persons.some(person => person.name === newName || person.number === newNumber)) { //tarkistetaan onko numeroa tai nimeä jo kirjoilla
      alert(`${newName} is already added to phonebook`) 
    } else{
      setPersons(persons.concat(nameObject))
      setNewName('') 
      setNewNumber('')
    }
  }

  const handleName = (event) => {setNewName(event.target.value)}

  const handleNumber = (event) => {setNewNumber(event.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameAndNumber}>
        <div>name: <input value={newName} onChange={handleName}/></div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <p>
        {persons.map((person) =>
          <li key={person.name}>{person.name} {person.number}</li> 
        )}
      </p>
    </div>
  )

}

export default App
