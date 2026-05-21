export default function Filter({ filterString, onChange }) {
  return (
    <form>
      filter shown with 
      <input onChange={onChange} value={filterString} />
    </form>
  )
}