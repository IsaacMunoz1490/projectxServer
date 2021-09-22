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

// Handling comments
hatsRouter.route('/:hatsId/comments')
.get((req, res, next) => {
    Hats.findById(req.params.hatsId)
    .then(hat => {
        if (campsite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(hat.comments);
        } else {
            err = new Error(`Hats ${req.params.hatsId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Hats.findById(req.params.hatsId)
    .then(hat => {
        if (hat) {
            hat.comments.push(req.body);
            hat.save()
            .then(hat => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hat);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Hats ${req.params.hatsId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /hats/${req.params.hatsId}/comments`);
})
.delete((req, res, next) => {
    Hats.findById(req.params.hatsId)
    .then(hat => {
        if (hat) {
            for (let i = (hat.comments.length-1); i >= 0; i--) {
                hat.comments.id(hat.comments[i]._id).remove();
            }
            hat.save()
            .then(hat => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hat);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Hats ${req.params.hatsId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

hatsRouter.route('/:hatsId/comments/:commentId')
.get((req, res, next) => {
    Hats.findById(req.params.hatsId)
    .then(hat => {
        if (hat && hat.comments.id(req.params.hatsId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(hat.comments.id(req.params.hatsId));
        } else if (!hat) {
            err = new Error(`Hats ${req.params.hatsId} not found`);
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
    res.end(`POST operation not supported on /hats/${req.params.hatsId}/comments/${req.params.commentId}`);
})
.put((req, res, next) => {
    Hats.findById(req.params.hatsId)
    .then(hat => {
        if (hat && hat.comments.id(req.params.commentId)) {
            if (req.body.rating) {
                hat.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.text) {
                hat.comments.id(req.params.commentId).text = req.body.text;
            }
            hat.save()
            .then(hat => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hat);
            })
            .catch(err => next(err));
        } else if (!hat) {
            err = new Error(`Hats ${req.params.hatsId} not found`);
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
    Hats.findById(req.params.hatsId)
    .then(hat => {
        if (hat && hat.comments.id(req.params.commentId)) {
            hat.comments.id(req.params.commentId).remove();
            hat.save()
            .then(hat => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(hat);
            })
            .catch(err => next(err));
        } else if (!hat) {
            err = new Error(`Hats ${req.params.hatsId} not found`);
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

module.exports = hatsRouter;