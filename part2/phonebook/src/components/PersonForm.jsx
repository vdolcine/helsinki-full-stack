export default function PersonForm({ handleAddName, newName, newNumber, onNameChange, onNumberChange }) {
  return (
    <form>
        <div>
          name: <input onChange={onNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={onNumberChange} value={newNumber}/>
        </div>
        <div>
          <button onClick={handleAddName} type="submit">add</button>
        </div>
      </form>
  )
}