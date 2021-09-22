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

// Handling comments
shoesRouter.route('/:shoesId/comments')
.get((req, res, next) => {
    Shoes.findById(req.params.shoesId)
    .then(shoe => {
        if (campsite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(shoe.comments);
        } else {
            err = new Error(`Shoes ${req.params.shoesId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Shoes.findById(req.params.shoesId)
    .then(shoe => {
        if (shoe) {
            shoe.comments.push(req.body);
            shoe.save()
            .then(shoe => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(shoe);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Shoes ${req.params.shoesId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /shoes/${req.params.shoesId}/comments`);
})
.delete((req, res, next) => {
    Shoes.findById(req.params.shoesId)
    .then(shoe => {
        if (shoe) {
            for (let i = (shoe.comments.length-1); i >= 0; i--) {
                shoe.comments.id(shoe.comments[i]._id).remove();
            }
            shoe.save()
            .then(shoe => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(shoe);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Shoes ${req.params.shoesId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

shoesRouter.route('/:shoesId/comments/:commentId')
.get((req, res, next) => {
    Shoes.findById(req.params.shoesId)
    .then(shoe => {
        if (shoe && shoe.comments.id(req.params.shoesId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(shoe.comments.id(req.params.shoesId));
        } else if (!shoe) {
            err = new Error(`Shoes ${req.params.shoesId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /shoes/${req.params.shoesId}/comments/${req.params.commentId}`);
})
.put((req, res, next) => {
    Shoes.findById(req.params.shoesId)
    .then(shoe => {
        if (shoe && shoe.comments.id(req.params.commentId)) {
            if (req.body.rating) {
                shoe.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.text) {
                shoe.comments.id(req.params.commentId).text = req.body.text;
            }
            shoe.save()
            .then(shoe => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(shoe);
            })
            .catch(err => next(err));
        } else if (!shoe) {
            err = new Error(`Shoes ${req.params.shoesId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Shoes.findById(req.params.shoesId)
    .then(shoe => {
        if (shoe && shoe.comments.id(req.params.commentId)) {
            shoe.comments.id(req.params.commentId).remove();
            shoe.save()
            .then(shoe => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(shoe);
            })
            .catch(err => next(err));
        } else if (!shoe) {
            err = new Error(`Shoes ${req.params.shoesId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

module.exports = shoesRouter;