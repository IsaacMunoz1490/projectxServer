const express = require('express');
const Tops = require('../models/tops');


const topsRouter = express.Router();

topsRouter.route('/')
.get((req, res, next) => {
    Tops.find()
    .then(tops => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tops);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Tops.create(req.body)
    .then(top => {
        console.log('New Tops Added', top);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(top);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode= 403;
    res.end('PUT operation not supported on /tops');
})
.delete((req, res, next) => {
    Tops.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

// topsId
topsRouter.route('/:topsId')
.get((req, res, next) => {
    Tops.findById(req.params.topsId)
    .then(top => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(top);
    })
    .catch(err => next(err))
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not uspported on /tops/${req.params.topsId} to you`);
})
.put((req, res, next) => {
    Tops.findByIdAndUpdate(req.params.topsId, {$set: req.body}, {new: true })
    .then(top => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(top);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Tops.findByIdAndDelete(req.params.topsId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = topsRouter;