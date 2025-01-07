const Details = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number} <button onClick={handleDelete}>delete</button>
  </p>
);

export const ShowNumbers = ({ persons, filter, handleDeleteOf }) => (
  <>
    <h2>Numbers</h2>
    {persons.map((person) => {
      if (person.name.toLowerCase().search(filter.toLowerCase()) !== -1) {
        return (
          <Details
            key={person.id}
            person={person}
            handleDelete={() => handleDeleteOf(person)}
          />
        );
      }
    })}
  </>
);
