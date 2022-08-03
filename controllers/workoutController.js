const WorkoutModel = require('../models/workoutModel');
const mongoose = require('mongoose');

const getWorkouts = async (req, res) => {
	try {
		const workouts = await WorkoutModel.find({}).sort({createWorkoutdAt: -1}); // returns model and sorts from newest entry to oldest
		res.status(200).json(workouts);
	} catch(e) {
		res.status(400).json(e.message);
	}
} 

const getWorkout = async (req, res) => {
	try {
		const { id } = req.params;
		mongoose.Types.ObjectId(id);
		const workout = await WorkoutModel.findById(id);
		workout ? res.status(200).json(workout) : res.status(404).json({error: `No such workout exists`});
	} catch (e) {
		res.status(404).json({error: "No such workout exists"});
	}
}

const createWorkout = async (req, res) => {

	try {
		const { title, load, reps } = req.body; 		const emptyFields = [];
		if(!title) {
			emptyFields.push('title');
		}
		if(!reps) {
			emptyFields.push('reps');
		}
		if(emptyFields.length > 0) {
			return res.status(400).json({ err: "Please fill in all fields", emptyFields});
		}

		const workout = await WorkoutModel.create({ title, load, reps });
		res.status(200).json(workout);
	} catch(e) {
		res.status(404).json({error: e.message});
	}
}

const deleteWorkout = async (req, res) => {
	try {
		const { id } = req.params;
		mongoose.Types.ObjectId(id);
		const workout = await WorkoutModel.findByIdAndDelete({"_id": id});
		workout ? res.status(200).json(workout) : res.status(404).json({error: "No such workout exists."});
	} catch (e) {
		res.status(404).json({error: "No such workout exists."});
	}
}

const editWorkout = async (req, res) => {
	try {
		const { id } = req.params;
		mongoose.Types.ObjectId(id);
		const workout = await WorkoutModel.findByIdAndUpdate({"_id": id}, { ...req.body });		workout ? res.status(200).json(workout) : res.status(404).json({error: "No such workout exists."});
	} catch (e) {
		res.status(404).json({error: e.message});
	}
}

module.exports = {
	getWorkouts,
	getWorkout,
	createWorkout,	
	deleteWorkout, 
	editWorkout
}