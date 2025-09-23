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
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName} handleName={handleName} 
        newNumber={newNumber} handleNumber={handleNumber}
        addNameAndNumber={addNameAndNumber}
      />
      <h3>Numbers</h3>
      <p>
        {filteredPersons.map(person =>
           <Persons key={person.name} person={person}/>
        )}
      </p>
    </div>
  )

}

const Persons = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addNameAndNumber}>
      <div>name: <input value={props.newName} onChange={props.handleName}/></div>
      <div>number: <input value={props.newNumber} onChange={props.handleNumber}/></div>
      <button type="submit">add</button>
    </form>
  )
}

const Filter = ({search, handleSearch}) => {
  return(
  <div>
    filter shown with <input value={search} onChange={handleSearch} />
  </div>
  )
}

export default App
