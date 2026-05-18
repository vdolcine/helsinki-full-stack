const Part = (props) => {
	console.log(props)
	return (
		<>
			<p>{props.part.name} {props.part.exercises}</p>
		</>
	)
}

const Content = (props) => {
	return (
		<>
			<Part part={props.parts[0]} />
			<Part part={props.parts[1]} />
			<Part part={props.parts[2]} />
		</>
	)
}

export default Content