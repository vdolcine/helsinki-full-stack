import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleAddName = (event) => {
    event.preventDefault()
    const isDuplicateName = checkDuplicateName()
    if (isDuplicateName) {
      alert(`${newName} is already added to the phonebook` )
      setNewName('')
    } else {
       const newPerson = {
         name: newName,
         number: newNumber
       }
       setPersons(persons.concat(newPerson))
     }
  }

  const checkDuplicateName = () => {
    for (let person of persons) {
      if (person.name === newName) return true
    }
    return false
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={(event) => setFilterString(event.target.value)} filterString={filterString}/>
      <h2>add a new</h2>
      <PersonForm 
        handleAddName={handleAddName}
        newName={newName}
        newNumber={newNumber}
        onNameChange={(event) => setNewName(event.target.value)}
        onNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <h2>Numbers</h2>
      <Persons filterString={filterString} persons={persons} />
    </div>
  )
}

export default App