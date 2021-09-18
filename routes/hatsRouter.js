const express = require('express');
const hatsRouter = express.Router();

hatsRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Uploading all the hats for you!');
})
.post((req, res) => {
    res.end(`Will add the hats: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode= 403;
    res.end('PUT operation not supported on /hats');
})
.delete((req, res) => {
    res.end('Deleting all hats!');
});

// hatsId
hatsRouter.route('/:hatsId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the hats: ${req.params.hatsId} to you`)
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not uspported on /hats/${req.params.shoesId} to you`);
})
.put((req, res) => {
    res.write(`Updating the hats: ${req.params.hatsId}\n`)
    res.end(`Will update the hats: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting hats: ${req.params.shoesId}`);
})


module.exports = hatsRouter;