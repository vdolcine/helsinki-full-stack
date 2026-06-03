const Notification = ({ name, type }) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const warningStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <>
      {type === 'success'&& <div style={successStyle}>Added {name}</div>}
      {type === 'warning' && <div style={warningStyle}>Information of {name} has already been removed from server</div>}
    </>
  )
}

export default Notification