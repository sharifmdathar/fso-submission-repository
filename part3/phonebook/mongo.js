const mongoose = require("mongoose");

const [password, personName, personNumber] = process.argv.slice(2);
if (!password) {
  console.log("Please Enter a Password");
  process.exit(1);
}

const url = `mongodb+srv://sharifmdathar:${password}@learning.rd8ao.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Learning`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  personName: String,
  personNumber: String,
});

const Person = mongoose.model("Person", personSchema);

if (!personName) {
  console.log("Listing all entries of phonebook");
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
} else if (!personNumber) {
  console.log("Please Enter a number");
  mongoose.connection.close();
} else {
  const newPerson = new Person({ personName, personNumber });
  newPerson.save().then((result) => {
    console.log(
      `added ${result.personName} number ${result.personNumber} to phonebook`
    );
    mongoose.connection.close();
  });
}
