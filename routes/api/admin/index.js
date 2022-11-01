import express from "express";

const router = express.Router();

/* GET api listing. */
router.get("/", function (req, res, next) {
    res.send("Admin api");
});

export default router;
