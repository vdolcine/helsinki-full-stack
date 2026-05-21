export default function Persons({ filterString, persons }) {
  return (
    <>
      {filterString 
        ? persons.filter(
          person => person.name.toLowerCase().includes(filterString)
        ).map(person => <p key={person.id}>{person.name} {person.number}</p>)
        : persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)
      }
    </>
  )
}