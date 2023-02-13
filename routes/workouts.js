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

// Create
router.post('/', createWorkout);

// Read
router.get('/', getWorkouts);

router.get('/:id', getWorkout);

// Update
router.patch('/:id', editWorkout);

// Delete
router.delete('/:id', deleteWorkout);

module.exports = router;