import express from 'express';

const app = express();
const port = 3016;

app.get('/', (req, res) => {
	res.json({
		message: "this works"
	})
});

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});