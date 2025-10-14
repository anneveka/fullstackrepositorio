import { useState, useEffect } from 'react'
import personService from './services/persons'
import { createWebSocketModuleRunnerTransport } from 'vite/module-runner'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName, //määritellään uusi nimi
      number: newNumber // ja numero
    }
    if (persons.some(person => person.name === newName || person.number === newNumber)) { //tarkistetaan onko numeroa tai nimeä jo kirjoilla
      alert(`${newName} is already added to phonebook`) 
    } else{
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
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
           <Persons key={person.name} person={person} setPersons={setPersons}/>
        )}
      </p>
    </div>
  )

}


const Persons = (props) => {

  const deletePerson = () => {
    if(confirm(`Delete ${props.person.name}?`)) {
    personService
      .remove(props.person.id)
      .then(response => {
        props.setPersons(theRest => 
          theRest.filter(person => person.id !== props.person.id)
        )
      })
    }
  }

  return (
    <li>
      {props.person.name} {props.person.number}  <button onClick={() => deletePerson()}>delete</button>
    </li>
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
