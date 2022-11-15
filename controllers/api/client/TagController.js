import { Tags, Blogs } from "../../../models";
import {
    dataMapResponse,
    responseFailure,
    responseSuccess,
} from "../../../classes/response";
import constants from "../../../config/constants";

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
            return res.send(responseFailure("", error));
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
            return res.send(responseFailure("", error));
        }
    },
};

export default TagController;
