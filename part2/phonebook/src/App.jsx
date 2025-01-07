import { useEffect, useState } from "react";
import personServices from "./services/persons";

const Filter = ({ setFilter }) => (
  <p>
    filter shown with <input onChange={(e) => setFilter(e.target.value)} />
  </p>
);

const AddNewNumberForm = ({
  handleSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <>
    <h2>add a new</h2>
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
);

const Details = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number} <button onClick={handleDelete}>delete</button>
  </p>
);

const ShowNumbers = ({ persons, filter, handleDeleteOf }) => (
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

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personServices.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find((el) => el.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      };
      personServices.addPerson(newPerson).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDeleteOf = (person) => {
    console.log(person);
    if (window.confirm(`Delete record of ${person.name}?`)) {
      personServices.deletePerson(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <AddNewNumberForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <ShowNumbers
        persons={persons}
        filter={filter}
        handleDeleteOf={handleDeleteOf}
      />
    </div>
  );
};

export default App;
