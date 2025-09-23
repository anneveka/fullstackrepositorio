import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <input value={newName} onChange={handleName} />
        <button type="submit">add</button>
      </form>
      <ul>
        {persons.map((person) =>
          <li key={person.name}>{person.name}</li> 
        )}
      </ul>
      <h2>Numbers</h2>
      ...
    </div>
  )

}

export default App
