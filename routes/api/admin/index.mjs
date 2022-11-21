import express from "express";
import BlogController from "../../../controllers/api/admin/BlogController.mjs";
import TagController from "../../../controllers/api/admin/TagController.mjs";
import { roles } from "../../../middlewares/auth.mjs";
import { ROLE } from "../../../classes/constants.mjs";

const router = express.Router();

/* GET api listing. */
router.get("/", function (req, res, next) {
    res.send("Admin api");
});

//Tag
router.get(
    "/tags/:id",

    roles([ROLE.ADMIN, ROLE.TAG_MANAGER]),
    TagController.show
);
router.post(
    "/tags",

    roles([ROLE.ADMIN, ROLE.TAG_MANAGER]),
    TagController.store
);
router.put(
    "/tags/:id",

    roles([ROLE.ADMIN, ROLE.TAG_MANAGER]),
    TagController.update
);
router.delete(
    "/tags/:id",

    roles([ROLE.ADMIN, ROLE.TAG_MANAGER]),
    TagController.destroy
);
router.get(
    "/tags/:id/restore",

    roles([ROLE.ADMIN, ROLE.TAG_MANAGER]),
    TagController.restore
);

//Blog
router.get(
    "/blogs/:id",

    roles([ROLE.ADMIN, ROLE.BLOG_MANAGER]),
    BlogController.show
);
router.post(
    "/blogs",

    roles([ROLE.ADMIN, ROLE.BLOG_MANAGER]),
    BlogController.store
);
router.put(
    "/blogs/:id",

    roles([ROLE.ADMIN, ROLE.BLOG_MANAGER]),
    BlogController.update
);
router.delete(
    "/blogs/:id",

    roles([ROLE.ADMIN, ROLE.BLOG_MANAGER]),
    BlogController.destroy
);
router.get(
    "/blogs/:id/restore",

    roles([ROLE.ADMIN, ROLE.BLOG_MANAGER]),
    BlogController.restore
);

export default router;
