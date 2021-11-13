import express from 'express';
import mongodb, { MongoClient } from 'mongodb';

const app = express();
const port = 3016;
const mongoConnectString = 'mongodb://localhost:27017';
const client = new MongoClient(mongoConnectString);

app.use(express.json());

const execMongo = async (done) => {
	await client.connect();
	const db = client.db('api001');
	done(db);
}

app.get('/', (req, res) => {
	execMongo(async (db) => {
		const users = await db.collection('users100').find()
			.project({
				name: 1,
				username: 1,
				email: 1
			}).toArray();
		res.json(users);
	});
});

app.delete('/delete/:id', (req, res) => {
	const id = req.params.id;
	execMongo(async (db) => {
		const deleteResult = await db.collection('users100').deleteOne({ _id: new mongodb.ObjectId(id) });
		res.json({
			result: deleteResult
		});
	});
});

app.post('/insert', (req, res) => {
	const user = req.body.user;
	execMongo(async (db) => {
		const insertResult = await db.collection('users100').insertOne(user);
		res.json({
			result: insertResult 
		});
	});
});

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});