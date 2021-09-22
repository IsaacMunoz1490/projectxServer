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

// Handling comments
topsRouter.route('/:topsId/comments')
.get((req, res, next) => {
    Tops.findById(req.params.topsId)
    .then(top => {
        if (campsite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(top.comments);
        } else {
            err = new Error(`Tops ${req.params.topsId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Tops.findById(req.params.topsId)
    .then(top => {
        if (top) {
            top.comments.push(req.body);
            top.save()
            .then(top => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(top);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Tops ${req.params.topsId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /tops/${req.params.topsId}/comments`);
})
.delete((req, res, next) => {
    Tops.findById(req.params.topsId)
    .then(top => {
        if (top) {
            for (let i = (top.comments.length-1); i >= 0; i--) {
                top.comments.id(top.comments[i]._id).remove();
            }
            top.save()
            .then(top => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(top);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Tops ${req.params.topsId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

topsRouter.route('/:topsId/comments/:commentId')
.get((req, res, next) => {
    Tops.findById(req.params.topsId)
    .then(top => {
        if (top && top.comments.id(req.params.topsId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(top.comments.id(req.params.topsId));
        } else if (!top) {
            err = new Error(`Tops ${req.params.topsId} not found`);
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
    res.end(`POST operation not supported on /tops/${req.params.topsId}/comments/${req.params.commentId}`);
})
.put((req, res, next) => {
    Tops.findById(req.params.topsId)
    .then(top => {
        if (top && top.comments.id(req.params.commentId)) {
            if (req.body.rating) {
                top.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.text) {
                top.comments.id(req.params.commentId).text = req.body.text;
            }
            top.save()
            .then(top => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(top);
            })
            .catch(err => next(err));
        } else if (!top) {
            err = new Error(`Tops ${req.params.topsId} not found`);
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
    Tops.findById(req.params.topsId)
    .then(top => {
        if (top && top.comments.id(req.params.commentId)) {
            top.comments.id(req.params.commentId).remove();
            top.save()
            .then(top => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(top);
            })
            .catch(err => next(err));
        } else if (!top) {
            err = new Error(`Tops ${req.params.topsId} not found`);
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

module.exports = topsRouter;