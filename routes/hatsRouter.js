const express = require('express');
const Hats = require('../models/hats');


const hatsRouter = express.Router();

hatsRouter.route('/')
.get((req, res, next) => {
    Hats.find()
    .then(hats => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hats);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Hats.create(req.body)
    .then(hat => {
        console.log('New Hats Added', hat);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hat);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode= 403;
    res.end('PUT operation not supported on /hats');
})
.delete((req, res, next) => {
    Hats.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

// hatsId
hatsRouter.route('/:hatsId')
.get((req, res, next) => {
    Hats.findById(req.params.hatsId)
    .then(hat => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hat);
    })
    .catch(err => next(err))
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not uspported on /hats/${req.params.hatsId} to you`);
})
.put((req, res, next) => {
    Hats.findByIdAndUpdate(req.params.hatsId, {$set: req.body}, {new: true })
    .then(hat => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(hat);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Hats.findByIdAndDelete(req.params.hatsId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = hatsRouter;