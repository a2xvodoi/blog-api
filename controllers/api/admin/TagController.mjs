import { Tags } from "../../../models";
import { tagValidator } from "../../../validations/tag";
import { responseFailure, responseSuccess } from "../../../classes/response";
import slugify from "../../../classes/slugify";
import { base64Decode } from "../../../classes/helpers";
import logger from "../../../logs/winston";

const TagController = {
    async show(req, res) {
        try {
            const tag = await Tags.findOne({
                where: {
                    id: req.params.id,
                },
            });
            return res.send(responseSuccess("", tag));
        } catch (err) {
            logger.error(err);
            return res.send(responseFailure("", { errors: err.message }));
        }
    },
    async store(req, res) {
        const { error } = tagValidator(req.body);

        try {
            if (error) throw new Error(error.details[0].message);
            const existTag = await Tags.findOne({
                where: {
                    title: req.body.title,
                },
            });

            if (existTag)
                return res.send(
                    responseFailure("", {
                        errors: "Title field already exists!",
                    })
                );
            let data = {
                title: req.body.title,
                slug: slugify(req.body.title),
                describe: req.body.describe,
                parent_id: req.body.parent_id,
            };
            if (req.body.image) {
                const image = base64Decode(req.body.image);
                data = { ...data, image: image };
            }
            const tag = await Tags.create(data);
            await tag.save();
            return res.send(responseSuccess("", tag));
        } catch (err) {
            logger.error(err);
            return res.send(responseFailure("", { errors: err.message }));
        }
    },
    async update(req, res) {
        const { error } = tagValidator(req.body);

        try {
            if (error) throw new Error(error.details[0].message);
            const tag = await Tags.findOne({
                where: {
                    id: req.params.id,
                },
            });

            if (!tag) {
                throw new Error("Tag not found!");
            }

            if (tag.title !== req.body.title) {
                tag.title = req.body.title;
                tag.slug = slugify(req.body.title);
            }
            tag.describe = req.body.describe;
            tag.parent_id = req.body.parent_id;

            if (req.body.image) {
                const image = base64Decode(req.body.image);
                tag.image = image;
            }

            await tag.save();
            res.send(responseSuccess("", tag));
        } catch (err) {
            logger.error(err);
            return res.send(responseFailure("", { errors: err.message }));
        }
    },
    async destroy(req, res) {
        try {
            const tag = await Tags.findOne({
                where: {
                    id: req.params.id,
                },
            });

            if (!tag) {
                throw new Error("Tag not found!");
            }

            await tag.destroy();
            res.send(responseSuccess("Delete tag success!"));
        } catch (error) {
            logger.error(error);
            return res.send(responseFailure("", { errors: error.message }));
        }
    },
    async restore(req, res) {
        try {
            const tag = await Tags.findOne({
                where: {
                    id: req.params.id,
                },
                paranoid: false,
            });

            if (!tag) {
                throw new Error("Tag not found!");
            }

            await tag.restore();
            res.send(responseSuccess("Restore tag success!"));
        } catch (error) {
            logger.error(error);
            return res.send(responseFailure("", { errors: error.message }));
        }
    },
};

export default TagController;
