// web framework for Node.js
const express = require('express');
const router = express.Router();

const {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	editWorkout
} = require('../controllers/workoutController');

// Get all workouts
router.get('/', getWorkouts);

// Get a workout
router.get('/:id', getWorkout);

// Post new workout, add to the mongodb database
router.post('/', createWorkout);

// Delete a workout
router.delete('/:id', deleteWorkout);

// Update a workout
router.patch('/:id', editWorkout);

module.exports = router;