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

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id).then((data) => res.json(data));
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number)
    return res.status(400).json({ error: "The name or number is missing" });
  if (persons.find((p) => p.name === name))
    return res
      .status(409)
      .json({ error: "The name already exists in the phonebook" });
  const id = String(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
  const newPerson = { id, name, number };
  persons.push(newPerson);
  res.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("App is listening on PORT", PORT);
});
