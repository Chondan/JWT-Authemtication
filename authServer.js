require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extend: false }));

let refrestTokens = [];

app.post('/token', function(req, res) {
	const refrestToken = req.body.token;
	if (refrestToken == null) return res.sendStatus(401);
	if (!refrestTokens.includes(refrestToken)) return res.sendStatus(403);
	jwt.verify(refrestToken, process.env.REFRESH_TOKEN_SECRET, function(err, decoded) {
		if (err) return res.sendStatus(403);
		const accessToken = generateAccessToken({ username: decoded.username });
		res.json({ accessToken });
	});
});

app.delete('/logout', function(req, res) {
	refrestTokens = refrestTokens.filter(token => token !== req.body.token);
	res.sendStatus(204).end("Deleted token");
});

app.post('/login', function(req, res) {
	const { username } = req.body;
	const payload = { username: username };
	const jwt_token = generateAccessToken(payload);
	const refrestToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
	refrestTokens.push(refrestToken);
	res.json({ accessToken: jwt_token, refrestToken });
});

function generateAccessToken(payload) {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

app.listen(4000, () => console.log("Server started: Listening at port 4000"));