const express = require('express');
const bottomsRouter = express.Router();

bottomsRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Uploading all the bottoms for you!');
})
.post((req, res) => {
    res.end(`Will add the bottoms: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode= 403;
    res.end('PUT operation not supported on /bottoms');
})
.delete((req, res) => {
    res.end('Deleting all bottoms!');
});

// bottomsId
bottomsRouter.route('/:bottomsId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the bottoms: ${req.params.bottomsId} to you`)
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not uspported on /bottoms/${req.params.bottomsId} to you`);
})
.put((req, res) => {
    res.write(`Updating the bottoms: ${req.params.bottomsId}\n`)
    res.end(`Will update the bottoms: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting bottoms: ${req.params.bottomsId}`);
})


module.exports = bottomsRouter;