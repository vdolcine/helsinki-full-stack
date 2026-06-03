export default function Persons({ filterString, persons, handleDeletePerson }) {
	const displayPersons = filterString
		? persons.filter(
			person => person.name.toLowerCase().includes(filterString)
		) : persons

	const stylingBlock = {
		display: 'flex', alignItems: 'center', gap: '5px'
	}

	return (
		<>
			{displayPersons.map(person => {
				return (
					<div key={person.id} style={stylingBlock}>
						<p>{person.name} {person.number}</p>
						<button onClick={() => handleDeletePerson(person)}>delete</button>
					</div>
				)
			})}
		</>
	)
}