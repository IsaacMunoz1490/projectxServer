const express = require('express');
const Bottoms = require('../models/bottoms');


const bottomsRouter = express.Router();

bottomsRouter.route('/')
.get((req, res, next) => {
    Bottoms.find()
    .then(bottoms => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bottoms);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Bottoms.create(req.body)
    .then(bottom => {
        console.log('New Bottoms Added', bottom);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bottom);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode= 403;
    res.end('PUT operation not supported on /bottoms');
})
.delete((req, res, next) => {
    Bottoms.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

// bottomsId
bottomsRouter.route('/:bottomsId')
.get((req, res, next) => {
    Bottoms.findById(req.params.bottomsId)
    .then(bottom => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bottom);
    })
    .catch(err => next(err))
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not uspported on /bottoms/${req.params.bottomsId} to you`);
})
.put((req, res, next) => {
    Bottoms.findByIdAndUpdate(req.params.bottomsId, {$set: req.body}, {new: true })
    .then(bottom => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bottom);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Bottoms.findByIdAndDelete(req.params.bottomsId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = bottomsRouter;