import { useEffect, useState } from 'react'
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		noteService
			.getAll()
			.then(notes => {
				setNotes(notes)
			})
	}, [])

	const handleAddNote = (event) => {
		event.preventDefault()
		const noteObj = {
			content: newNote,
			important: Math.random() < 0.5,
		}

		noteService
			.create(noteObj)
			.then(newNote => {
				setNotes(notes.concat(newNote))
				setNewNote('')
			})

	}

	const handleNoteChange = (event) => {
		setNewNote(event.target.value)
	}

	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important)

	const toggleImportanceOf = id => {
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote).then(changedNote => {
				setNotes(notes.map(note => note.id === id ? changedNote : note))
			})
			.catch(error => {
				setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
				console.log(error)
				setNotes(notes.filter(n => n.id !== id))
			})
	}

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />
			<button onClick={() => setShowAll(!showAll)}>
				show {showAll ? 'important' : 'all'}
			</button>
			<ul>
				{notesToShow.map(note =>
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>)}
			</ul>
			<form onSubmit={handleAddNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type='submit'>save</button>
			</form>
			<Footer />
		</div>
	)
}

export default App
