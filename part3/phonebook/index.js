const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());
morgan.token("body", (req, res) => {
  if (req.method === "POST") return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  Person.find({}).then((data) => res.json(data));
});

app.get("/info", (req, res) => {
  Person.find({}).then((data) =>
    res.send(
      `<p>Phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>`
    )
  );
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((data) => {
      if (data) res.json(data);
      else res.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const name = req.body.name;
  const number = req.body.number;
  Person.findByIdAndUpdate(id, { name, number }, { new: true })
    .then((data) => {
      if (data) res.json(data);
      else res.status(404).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number)
    return res.status(400).json({ error: "The name or number is missing" });
  const newPerson = new Person({ name, number });
  newPerson.save().then((result) => res.json(result));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("App is listening on PORT", PORT);
});
