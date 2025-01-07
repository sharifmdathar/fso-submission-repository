import { useEffect, useState } from "react";
import { Notification } from "./components/Notification";
import { Filter } from "./components/Filter";
import { AddNewNumberForm } from "./components/AddNewNumberForm";
import { ShowNumbers } from "./components/ShowNumbers";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personServices.getAll().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.find((p) => p.name === newName);
    if (personExists) {
      const confirmReplace = window.confirm(
        `${personExists.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmReplace) {
        const newPerson = { ...personExists, number: newNumber };
        personServices.updatePerson(personExists.id, newPerson).then((data) => {
          setPersons(
            persons.map((p) =>
              p.name === data.name ? { ...p, number: data.number } : p
            )
          );
          setNewName("");
          setNewNumber("");
          setNotification(`Number of ${data.name} changed successfully`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
      }
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
        setNotification(`Added contact of ${data.name} successfully`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  const handleDeleteOf = (person) => {
    if (window.confirm(`Delete record of ${person.name}?`)) {
      personServices.deletePerson(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={notification} />
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
