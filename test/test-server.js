const chai = require("chai");
const chaiHttp = require("chai-http");
const {app, runServer, closeServer} = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Blog", function() {
	before(function() {
		return runServer;
	});

	after(function() {
		return closeServer;
	});

	it("Return blog posts on GET", function() {
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.be.a('array');
			const expectedKeys = ['id', 'title', 'content', 'author', 'publishDate'];
			res.body.forEach(function(item) {
				expect(item).to.be.a('object');
				expect(item).to.include.keys(expectedKeys);
			})
		})
	});

	it("Add new blog posts on POST", function() {
		const newItem = {title: "test", content: "foo bar fizz pop", author: "The Man"};
		return chai.request(app)
		.post('/blog-posts')
		.send(newItem)
		.then(function(res) {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body).to.be.a('object');
			expect(res.body).to.include.key("author", "content", "id", "publishDate", "title");
			expect(res.body.id).to.not.equal(null);
			expect(res.body).to.deep.equal(
				Object.assign(newItem, { id: res.body.id, publishDate: res.body.publishDate }));
		})

	});

	it("Update blog posts with id on PUT", function() {
		const updateData = {title: "updated", content: "updated content", author: "updated"};
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			updateData.id = res.body[0].id;
			return chai.request(app)
			.put(`/blog-posts/${updateData.id}`)
			.send(updateData)
		})
		.then(function(res) {
			expect(res).to.have.status(204);
		}) 
	});

	it("Remove posts with id on DELETE", function() {
		return chai.request(app)
		.get('/blog-posts')
		.then(function(res) {
			return chai.request(app).delete(`/blog-posts/${res.body.id}`)
		})
		.then(function(res) {
			expect(res).to.have.status(204);
		});
	});

});