const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models.js');

//adding new posts
router.post();

//removing posts
router.delete();

//updating blog posts
router.put();

//showing the posts
router.get();