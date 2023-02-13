let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

// assertion style
chai.should();
chai.use(chaiHttp);

let resId;

describe('WorkoutsApp backend API', () => {
// CRUD - Create / Read / Update / Delete

	// create 
	describe('POST - Create new workout', () => {
		it('Adds our new workout to the DB', done => {
			chai.request(server)
			.post('/api/workouts')
			.send({"title":"Dead Lift","load":"245","reps":"8"})
			.end((err, response) => {
				response.should.have.status(200);
				response.body.should.be.a("object");
				resId = response.body._id;
			done();
			})
		})
	})

	// Read
	describe('GET - all workouts', () => {
		it('Should get all workouts from our DB', done => {
			chai.request(server)
			.get('/api/workouts')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a("array");
			done();
			})
		})
	})

	describe('GET - single workout', () => {
		it('Should get an individual workout from our DB', done => {
			chai.request(server)
			.get(`/api/workouts/${resId}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a("object");
			done();
			})
		})
	})

	// update
	describe('Patch - update single workout', () => {
		it('Should update an individual workout from our DB', done => {
			chai.request(server)
			.patch(`/api/workouts/${resId}`)
			.send({"load":"265"})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a("object");
			done();
			})
		})
	})

	// delete
	describe('Delete - delete single workout', () => {
		it('Should delete an individual workout from our DB', done => {
			chai.request(server)
			.delete(`/api/workouts/${resId}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a("object");
			done();
			})
		})
	})
})