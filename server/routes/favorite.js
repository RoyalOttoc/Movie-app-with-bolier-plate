const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {

    // get number from MongoDB
    Favorite.find({ "movieId": req.body.movieId })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            // send the number to front
            res.status(200).json({ success: true, favoriteNumber: info.length })
        })

})

router.post('/favorited', (req, res) => {

    // checkout DB if the movie clicked as favorite


    // get number from MongoDB
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            // send the number to front

            let result = false;
            if (info.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })

})

module.exports = router;
