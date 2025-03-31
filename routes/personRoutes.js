const express = require('express');
const router = express.Router();
const Person = require("../model/person");

// for adding person data 
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);


  }
  catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "internal server error" });

  }

})


// for getting person data 
router.get("/", async (req, res) => {

  try {
    const data = await Person.find();
    console.log("data fetched sucessfully");
    res.status(200).json(data);


  }
  catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "error in fetching data " });

  }
})



// for getting specific data by workType

router.get("/:workType", async (req, res) => {

  try {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == "manager" || workType == "waiter") {

      const response = await Person.find({ work: workType });
      console.log("responses fetched")
      res.status(200).json(response);

    }

    else {
      res.status(400).json({ error: "Invalid workType " })
    }
  }
  catch (err) {
    return res.status(500).json({ error: "Internal server error" });

  }

})


// kisi bhi person ka data ko update krna ke liye 

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, { new: true }, { runValidators: true });
    console.log("user data updated sucessfully");

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json(response);

  }
  catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "error in updating data " });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('data delete');
    res.status(200).json({ message: 'person Deleted Successfully' });

  }
  catch (error) {
    res.status(500).json({ error: "Error in deleting the prson data " })
  }
});


module.exports = router;