import { useEffect, useState } from "react";
import { Message, Error } from "./components/Notification";
import { Filter } from "./components/Filter";
import { AddNewNumberForm } from "./components/AddNewNumberForm";
import { ShowNumbers } from "./components/ShowNumbers";
import personServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    personServices.getAll().then((data) => setPersons(data));
  }, []);

  const resetForm = () => {
    setNewName("");
    setNewNumber("");
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.find((p) => p.name === newName);
    if (personExists) {
      const confirmReplace = window.confirm(
        `${personExists.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmReplace) {
        const newPerson = { ...personExists, number: newNumber };
        personServices
          .updatePerson(personExists.id, newPerson)
          .then((data) => {
            setPersons(
              persons.map((p) =>
                p.name === data.name ? { ...p, number: data.number } : p
              )
            );
            setMessage(`Number of ${data.name} changed successfully`);
            resetForm();
          })
          .catch(() => {
            setErrorMsg(
              `Information of ${newPerson.name} has already been removed from the server`
            );
            resetForm();
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personServices
        .addPerson(newPerson)
        .then((data) => {
          setPersons(persons.concat(data));
          setMessage(`Added contact of ${data.name} successfully`);
          resetForm();
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error);
          setTimeout(() => {
            setErrorMsg(null);
          }, 5000);
        });
    }
  };

  const handleDeleteOf = (person) => {
    if (window.confirm(`Delete record of ${person.name}?`)) {
      personServices
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch(() => {
          setErrorMsg(
            `Information of ${person.name} has already been removed from the server`
          );
          resetForm();
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message msg={message} />
      <Error errorMsg={errorMsg} />
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
