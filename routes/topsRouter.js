const express = require('express');
const topsRouter = express.Router();

topsRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Uploading all the tops for you!');
})
.post((req, res) => {
    res.end(`Will add the tops: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode= 403;
    res.end('PUT operation not supported on /tops');
})
.delete((req, res) => {
    res.end('Deleting all tops!');
});

// topsId
topsRouter.route('/:topsId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the tops: ${req.params.topsId} to you`)
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not uspported on /tops/${req.params.topsId} to you`);
})
.put((req, res) => {
    res.write(`Updating the tops: ${req.params.topsId}\n`)
    res.end(`Will update the tops: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting tops: ${req.params.topsId}`);
})


module.exports = topsRouter;