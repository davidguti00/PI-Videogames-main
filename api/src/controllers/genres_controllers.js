require("dotenv").config();
const express = require('express');
const { Genre} = require ('../db');
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const allGenres = await Genre.findAll({
            order: [['name', "ASC"]]
        });
        res.send(allGenres);
    } catch (err) {
        next(err)
    }
});

module.exports = router;