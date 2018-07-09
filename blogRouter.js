const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models.js');

//making content
BlogPosts.create('First Post', 'This is my First blog post guys!!!', 'Kyle');
BlogPosts.create('Second Post', 'This is my Second blog post guys!!!', 'Kyle');

//adding new posts
router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i=0; i<requiredFields.length; i++) {
		console.log(req.body);
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body.`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
	res.status(201).json(item);
});

//removing posts
router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log(`Deleted Blog Post ${req.params.id}.`)
	res.status(204).end();
});

//updating blog posts
router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing ${field} in request body.`
			console.error(message);
			return res.status(400).send(message);
		}
	}
	if (req.params.id !== req.body.id) {
		const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(`Updating Blog Post with id of ${req.params.id}`);
	const updatedItem = BlogPosts.update({
		id: req.params.id,
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	});
	res.status(204).end();
});

//showing the posts
router.get('/', jsonParser, (req, res) => {
	res.json(BlogPosts.get());
});

module.exports = router;