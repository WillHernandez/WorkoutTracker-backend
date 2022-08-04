const express = require('express');
const app = express();
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const cors = require('cors');
const port = process.env.PORT || 80;
require('dotenv').config();

app.use(express.json());

const whitelist = [process.env.LOCALHOST, process.env.WORKOUTTRACKER];
const corsOptions = {
	origin: (origin, callback) => {
		if(whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use((req, res, next) => {
	console.log(`${req.path}: ${req.method}`);
	next();
})

app.use("/api/workouts", workoutRoutes); 

const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		const server = app.listen(port, () => {
			console.log(`Connected to Database On Port: ${port}`);
<<<<<<< HEAD
			console.log(server.address().address, server.address().port);
=======
>>>>>>> 30bd9d0 (Added procfile)
		})
	} catch (err) {
		console.error(err);
	}
}
dbConnect();