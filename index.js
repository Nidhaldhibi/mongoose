const mongoose = require("mongoose");
require("dotenv").config();
// Connect to data base
console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log("Connected To MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err.message));
// schema
const personsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
  },
});
// create model
const Person = mongoose.model("Person", personsSchema);
// Create and Save a Record of a Model:
const createPerson = async () => {
  const person = await Person.create({
    name: "jon doe",
    age: 30,
    favoriteFoods: ["spagetti", "gateau"],
  });
  try {
    const result = await person.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
// createPerson();
// Create Many Records with model.create()
// Use model.find() to Search Your Database
const createPersonnes = async (personnes) => {
  try {
    // const result = await Person.find(personnes);
    // const result = await Person.create(personnes);
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
createPersonnes([
  {
    name: "john john",
    age: 30,
    favoriteFoods: ["couscous", "gateau"],
  },
  {
    name: "jane jane",
    age: 18,
    favoriteFoods: ["spagetti", "gateau"],
  },
  {
    name: "jack jack",
    age: 22,
    favoriteFoods: ["salade", "gateau"],
  },
  {
    name: "jemy jemy",
    age: 22,
    favoriteFoods: ["salade", "couscous"],
  },
]);
// createPersonnes();

// Use model.find() to Search
const findPerson = async (person) => {
  try {
    const result = await Person.find({ name: person });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
// findPerson("jane jane");
// Use model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = async (food) => {
  try {
    const result = await Person.findOne({ favoriteFoods: food });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
// findOnePerson("gateau");
//Use model.findById() to Search Your Database By _id
const findIdPerson = async (personId) => {
  try {
    const result = await Person.find({ _id: personId });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
// findIdPerson("641854415cabab7ae9398ee4");
//Perform Classic Updates by Running Find, Edit, then Save
const updateFood = async (id, food) => {
  try {
    const result = await Person.findById({ _id: id });
    result.favoriteFoods.push(food);
    await result.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
// updateFood("641854415cabab7ae9398ee4", "hamburger");
//Perform New Updates on a Document Using model.findOneAndUpdate()
const updateAge = async (name, age) => {
  try {
    const result = await Person.findOneAndUpdate(
      { name },
      { age },
      { new: true }
    );
    await result.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};
// updateAge("jane jane", 20);
//Delete One Document Using model.findByIdAndRemove
const deletePerson = async (id) => {
  try {
    const result = await Person.findByIdAndRemove({ _id: id });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
// deletePerson("64185320aa8cb85e3bbb31fc");
// MongoDB and Mongoose - Delete Many Documents with model.remove()
const deleted = async (name) => {
  try {
    const result = await Person.deleteMany({ name });
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
// deleted("mary");
// Chain Search Query Helpers to Narrow Search Results
const find = async (food) => {
  try {
    const result = await Person.find({ favoriteFoods: food })
      .sort("-age")
      .limit(2);
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
};
find("gateau");
