import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad, totalVotes, totalScore }) => {
	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={neutral} />
				<StatisticLine text="bad" value={bad} />
				<StatisticLine text='all' value={totalVotes} />
				<StatisticLine text='average' value={(totalScore / totalVotes).toFixed(2)} />
				<StatisticLine text='positive' value={((good / totalVotes) * 100).toFixed(2)} />
			</tbody>
		</table>
	)
}

export default Statistics