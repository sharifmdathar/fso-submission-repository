const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

require("dotenv").config()
const url = process.env.MONGODB_URI
console.log("connecting to MongoDB")

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Must be at least 3, got {VALUE}"],
    required: true,
  },
  number: {
    type: String,
    minLength: [8, "Must be at least 8, got {VALUE}"],
    validate: {
      validator: (v) => /^(\d{2}|\d{3})-\d+$/.test(v),
      message: (props) =>
        `${props.value} is not a valid number. Expected format: 12-34567 or 123-4567 (only digits allowed after the hyphen).`,
    },
  },
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model("Person", personSchema)
module.exports = Person
