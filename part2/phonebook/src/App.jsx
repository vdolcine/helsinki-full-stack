import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterString, setFilterString] = useState('')
	const [success, setSuccess] = useState({})

	useEffect(() => {
		phonebookService
			.getEntirePhonebook()
			.then(phonebook => setPersons(phonebook))
	}, [])

	const handleAddPerson = (event) => {
		event.preventDefault()

		const isDuplicateName = checkDuplicateName()
		if (isDuplicateName) {
			const toUpdateNumber = confirm(`${newName} is already added to the phonebook, replace the number with a new one?`)
			if (toUpdateNumber) {
				const personToUpdate = persons.find(person => person.name === newName)
				phonebookService
					.updatePerson(personToUpdate.id, { name: personToUpdate.name, number: newNumber })
					.then(updatedPerson => {
						setPersons(persons.map(person => {
							return person.id === updatedPerson.id ? { ...updatedPerson } : person
						}))
						setNewName('')
						setNewNumber('')
					})
					.catch(error => {
						console.log('error when updating person', error)
						setSuccess({ name: personToUpdate.name, type: 'warning' })
						setNewName('')
						setNewNumber('')
					})
			} else {
				setNewName('')
				setNewNumber('')
			}
		} else {
			const newPerson = {
				name: newName,
				number: newNumber
			}
			phonebookService
				.createPerson(newPerson)
				.then(person => {
					setPersons(persons.concat(person))
					setNewName('')
					setNewNumber('')
					setSuccess({ name: person.name, type: 'success' })
					setTimeout(() => {
						setSuccess({})
					}, 5000)
				})
		}
	}

	const handleDeletePerson = (person) => {
		if (window.confirm(`Delete ${person.name}`)) {
			phonebookService
				.deletePerson(person.id)
				.then(deletedPerson => {
					setPersons(persons.filter(person => person.id !== deletedPerson.id))
				})
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
			<Notification name={success.name} type={success.type} />
			<Filter onChange={(event) => setFilterString(event.target.value)} filterString={filterString} />
			<h2>add a new</h2>
			<PersonForm
				handleAddPerson={handleAddPerson}
				newName={newName}
				newNumber={newNumber}
				onNameChange={(event) => setNewName(event.target.value)}
				onNumberChange={(event) => setNewNumber(event.target.value)}
			/>
			<h2>Numbers</h2>
			<Persons
				filterString={filterString}
				persons={persons}
				handleDeletePerson={handleDeletePerson}
			/>
		</div>
	)
}

export default App