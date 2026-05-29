export default function Persons({ filterString, persons, handleDeletePerson }) {
	const displayPersons = filterString
		? persons.filter(
			person => person.name.toLowerCase().includes(filterString)
		) : persons

	return (
		<>
			{displayPersons.map(person => {
				return (
					<div key={person.id}>
						<p>{person.name} {person.number}</p>
						<button onClick={() => handleDeletePerson(person)}>delete</button>
					</div>
				)
			})}
		</>
	)
}