require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extend: false }));
app.use(jwt_authentication);

app.post('/test', function(req, res) {
	const { name } = req.body;
	res.end(`Hello ${name}, How are you doing?`);
});

app.get('/', function(req, res) {
	res.end("Hello World");
});

const posts = [
	{ username: "chondan", title: "post1" }, { username: "mane", title: "post2" }
];

app.get('/posts', function(req, res) {
	const filter_posts = posts.filter(post => post.username === req.user.username);
	res.json(filter_posts);
});

function jwt_authentication(req, res, next) {
	const { authorization } = req.headers;
	const token = authorization ? authorization.split(' ')[1] : null;
	
	if (!token) {
		return res.sendStatus(401).end("Authorization failed");
	}

	const [ header, payload, signature ] = token.split('.');
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
		if (err) {
			return res.sendStatus(403).end("Access is forbidden to the requested page");
		}
		const { username } = decoded;
		req.user = { username };
		next();
	});
}

app.listen(3000, () => console.log("Server started: Listening at port 3000"));