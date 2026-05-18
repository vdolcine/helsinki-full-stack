const Total = ({ parts }) => {
	const total = parts.reduce((acc, curr) => {
		return (acc + curr.exercises)
	}, 0)

	return (
		<b>
			total of {total} exercises
		</b>
	)
}

export default Total