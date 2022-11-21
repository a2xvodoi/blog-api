import express from "express";
import AuthController from "../../../controllers/api/client/AuthController.mjs";
import TagController from "../../../controllers/api/client/TagController.mjs";
import BlogController from "../../../controllers/api/client/BlogController.mjs";
import { requireLogin } from "../../../middlewares/auth.mjs";

const router = express.Router();

/* GET api listing. */
router.get("/", function (req, res, next) {
    res.send("Client api");
});

// Auth
router.get("/check", requireLogin, AuthController.check);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.delete("/logout", AuthController.logout);

//Tags
router.get("/tags", TagController.list);
router.get("/tags/:slug", TagController.show);

//Blogs
router.get("/blogs", BlogController.list);
router.get("/blogs/latest", BlogController.latest);
router.get("/blogs/:slug", BlogController.show);
export default router;
