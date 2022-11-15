import express from "express";
import BlogController from "../../../controllers/api/admin/BlogController";
import TagController from "../../../controllers/api/admin/TagController";

const router = express.Router();

/* GET api listing. */
router.get("/", function (req, res, next) {
    res.send("Admin api");
});

//Tag
router.get("/tags/:id", TagController.show);
router.post("/tags", TagController.store);
router.put("/tags/:id", TagController.update);
router.delete("/tags/:id", TagController.destroy);
router.get("/tags/:id/restore", TagController.restore);

//Blog
router.get("/blogs", BlogController.list);
router.get("/blogs/:id", BlogController.show);
router.post("/blogs", BlogController.store);
router.put("/blogs/:id", BlogController.update);
router.delete("/blogs/:id", BlogController.destroy);
router.get("/blogs/:id/restore", BlogController.restore);

export default router;
