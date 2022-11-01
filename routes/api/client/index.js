import express from "express";
import AuthController from "../../../controllers/api/client/AuthController";
import TagController from "../../../controllers/api/client/TagController";
import BlogController from "../../../controllers/api/client/BlogController";

const router = express.Router();

/* GET api listing. */
router.get("/", function (req, res, next) {
    res.send("Client api");
});

// Auth
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.delete("/logout", AuthController.logout);

//Tags
router.get("/tags", TagController.list);
router.get("/tags/:slug", TagController.show);

//Blogs
router.get("/blogs/:slug", BlogController.show);
export default router;
