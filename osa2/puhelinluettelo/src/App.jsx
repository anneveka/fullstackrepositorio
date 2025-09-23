import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase()) //filteröidään hakuun sopivat nimet
  )

  const handleSearch = (event) => {setSearch(event.target.value)}
  const handleName = (event) => {setNewName(event.target.value)}
  const handleNumber = (event) => {setNewNumber(event.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={search} onChange={handleSearch}></input></div>
      <h2>add a new</h2>
      <form onSubmit={addNameAndNumber}>
        <div>name: <input value={newName} onChange={handleName}/></div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <p>
        {filteredPersons.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </p>
    </div>
  )

}

export default App
