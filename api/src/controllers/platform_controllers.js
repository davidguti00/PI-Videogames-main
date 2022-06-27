require("dotenv").config();
const express = require('express');
const { Platform } = require ('../db');
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const allPlatform = await Platform.findAll({
            attributes: {exclude: ['id']},
            order: [['name', "ASC"]]
        })
        res.send(allPlatform);
    } catch (err) {
        next(err)
    }
});

module.exports = router;