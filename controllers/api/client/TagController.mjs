import { Tags, Blogs } from "../../../models/index.mjs";
import {
    dataMapResponse,
    responseFailure,
    responseSuccess,
} from "../../../classes/response.mjs";
import constants from "../../../config/constants.mjs";
import logger from "../../../logs/winston.mjs";

const TagController = {
    async list(req, res) {
        try {
            const tags = await Tags.findAll({});
            const response = dataMapResponse(tags, [
                "id",
                "title",
                "slug",
                "image",
                "describe",
                "follow",
                "parent_id",
            ]);
            return res.send(responseSuccess("", response));
        } catch (error) {
            logger.error(error);
            return res.send(responseFailure("", { errors: error.message }));
        }
    },
    async show(req, res) {
        try {
            const blogs = await Blogs.findAll({
                where: {
                    published: constants.PUBLISHED,
                },
                include: {
                    model: Tags,
                    where: {
                        slug: req.params.slug,
                    },
                },
            });
            return res.send(responseSuccess("", blogs));
        } catch (error) {
            logger.error(error);
            return res.send(responseFailure("", { errors: error.message }));
        }
    },
};

export default TagController;
