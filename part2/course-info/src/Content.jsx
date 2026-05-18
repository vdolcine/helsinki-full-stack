const Part = ({ part }) => {
	return (
		<>
			<p>{part.name} {part.exercises}</p>
		</>
	)
}

const Content = ({ parts }) => {
	return (
		<>
			{parts.map(part => <Part key={part.id} part={part} />)}
		</>
	)
}

export default Content