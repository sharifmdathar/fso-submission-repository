import { useState } from "react";

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

const Details = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const ShowNumbers = ({ persons, filter }) => (
  <>
    <h2>Numbers</h2>
    {persons.map((person) => {
      if (person.name.toLowerCase().search(filter.toLowerCase()) !== -1) {
        return <Details key={person.id} person={person} />;
      }
    })}
  </>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      persons.find(
        (el) => JSON.stringify(el) === JSON.stringify({ name: newName })
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
      );
      setNewName("");
      setNewNumber("");
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
      <ShowNumbers persons={persons} filter={filter} />
    </div>
  );
};

export default App;
