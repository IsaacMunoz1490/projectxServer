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

// Handling comments
bottomsRouter.route('/:bottomsId/comments')
.get((req, res, next) => {
    Bottoms.findById(req.params.bottomsId)
    .then(bottom => {
        if (campsite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(bottom.comments);
        } else {
            err = new Error(`Bottoms ${req.params.bottomsId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Bottoms.findById(req.params.bottomsId)
    .then(bottom => {
        if (bottom) {
            bottom.comments.push(req.body);
            bottom.save()
            .then(bottom => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(bottom);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Bottoms ${req.params.bottomsId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /bottoms/${req.params.bottomsId}/comments`);
})
.delete((req, res, next) => {
    Bottoms.findById(req.params.bottomsId)
    .then(bottom => {
        if (bottom) {
            for (let i = (bottom.comments.length-1); i >= 0; i--) {
                bottom.comments.id(bottom.comments[i]._id).remove();
            }
            bottom.save()
            .then(bottom => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(bottom);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Bottoms ${req.params.bottomsId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

bottomsRouter.route('/:bottomsId/comments/:commentId')
.get((req, res, next) => {
    Bottoms.findById(req.params.bottomsId)
    .then(bottom => {
        if (bottom && bottom.comments.id(req.params.bottomsId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(bottom.comments.id(req.params.bottomsId));
        } else if (!bottom) {
            err = new Error(`Bottoms ${req.params.bottomsId} not found`);
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
    res.end(`POST operation not supported on /bottoms/${req.params.bottomsId}/comments/${req.params.commentId}`);
})
.put((req, res, next) => {
    Bottoms.findById(req.params.bottomsId)
    .then(bottom => {
        if (bottom && bottom.comments.id(req.params.commentId)) {
            if (req.body.rating) {
                bottom.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.text) {
                bottom.comments.id(req.params.commentId).text = req.body.text;
            }
            bottom.save()
            .then(bottom => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(bottom);
            })
            .catch(err => next(err));
        } else if (!bottom) {
            err = new Error(`Bottoms ${req.params.bottomsId} not found`);
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
    Bottoms.findById(req.params.bottomsId)
    .then(bottom => {
        if (bottom && bottom.comments.id(req.params.commentId)) {
            bottom.comments.id(req.params.commentId).remove();
            bottom.save()
            .then(bottom => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(bottom);
            })
            .catch(err => next(err));
        } else if (!bottom) {
            err = new Error(`Bottoms ${req.params.bottomsId} not found`);
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


module.exports = bottomsRouter;