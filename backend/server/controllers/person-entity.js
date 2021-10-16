import mongoose from "mongoose";
import Person from "../models/person.js";

// create new cause
export function createPerson(req, res) {
    const person = new Person({
        _id: mongoose.Types.ObjectId(),
        fullname: req.body.fullname,
        address: req.body.address,
        age: req.body.age,
    });

    return person
        .save()
        .then((newPerson) => {
            return res.status(201).json({
                success: true,
                message: "New person created successfully",
                Person: newPerson,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: error.message,
            });
        });
}

export function getAllPerson(req, res) {
    Person.find()
        .select("_id fullname age address")
        .then((allPerson) => {
            return res.status(200).json({
                success: true,
                message: "A list of all person",
                Person: allPerson,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error. Please try again.",
                error: err.message,
            });
        });
}

// get single person
export function getSinglePerson(req, res) {
    const id = req.params.personId;
    Person.findById(id)
      .then((singlePerson) => {
        res.status(200).json({
          success: true,
          message: `More on ${singlePerson.fullname}`,
          Person: singlePerson,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'This person does not exist',
          error: err.message,
        });
     });
  }

  // update person
export function updatePerson(req, res) {
    const id = req.params.personId;
    const updateObject = req.body;
    Person.update({ _id:id }, { $set:updateObject })
      .exec()
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'Person is updated',
          updatePerson: updateObject,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.'
        });
      });
  }

// delete a person
export function deletePerson(req, res) {
    const id = req.params.personId;
    Person.findByIdAndRemove(id)
      .exec()
      .then(()=> res.status(204).json({
        success: true,
      }))
      .catch((err) => res.status(500).json({
        success: false,
      }));
  }