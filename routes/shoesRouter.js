const express = require('express');
const shoesRouter = express.Router();

shoesRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Uploading all the shoes for you!');
})
.post((req, res) => {
    res.end(`Will add the shoes: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode= 403;
    res.end('PUT operation not supported on /shoes');
})
.delete((req, res) => {
    res.end('Deleting all shoes!');
});

// shoesId
shoesRouter.route('/:shoesId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send the shoes: ${req.params.shoesId} to you`)
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not uspported on /shoes/${req.params.shoesId} to you`);
})
.put((req, res) => {
    res.write(`Updating the shoes: ${req.params.shoesId}\n`)
    res.end(`Will update the shoes: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting shoes: ${req.params.shoesId}`);
})


module.exports = shoesRouter;