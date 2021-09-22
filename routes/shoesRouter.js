const express = require('express');
const Shoes = require('../models/shoes');


const shoesRouter = express.Router();

shoesRouter.route('/')
.get((req, res, next) => {
    Shoes.find()
    .then(shoes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shoes);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Shoes.create(req.body)
    .then(shoe => {
        console.log('New Shoes Added', shoe);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shoe);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode= 403;
    res.end('PUT operation not supported on /shoes');
})
.delete((req, res, next) => {
    Shoes.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

// shoesId
shoesRouter.route('/:shoesId')
.get((req, res, next) => {
    Shoes.findById(req.params.shoesId)
    .then(shoe => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shoe);
    })
    .catch(err => next(err))
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not uspported on /shoes/${req.params.shoesId} to you`);
})
.put((req, res, next) => {
    Shoes.findByIdAndUpdate(req.params.shoesId, {$set: req.body}, {new: true })
    .then(shoe => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shoe);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Shoes.findByIdAndDelete(req.params.shoesId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = shoesRouter;