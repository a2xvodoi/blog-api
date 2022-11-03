import { Tags } from "../../../models";
import { tagValidator } from "../../../validations/tag";
import { responseFailure, responseSuccess } from "../../../classes/response";
import slugify from "../../../classes/slugify";

const TagController = {
    async store(req, res) {
        const { error } = tagValidator(req.body);
        if (error) throw new Error(error.details[0].message);

        try {
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
            const tag = await Tags.create({
                title: req.body.title,
                slug: slugify(req.body.title),
                describe: req.body.describe,
                parent_id: req.body.parent_id,
            });
            await tag.save();
            return res.send(responseSuccess("", tag));
        } catch (err) {
            return res.send(responseFailure("", { errors: err.message }));
        }
    },
    async update(req, res) {
        const { error } = tagValidator(req.body);
        if (error) throw new Error(error.details[0].message);

        try {
            const tag = await Tags.findOne({
                where: {
                    id: req.params.id,
                },
            });

            if (!tag) {
                throw new Error("Tag not found!");
            }

            tag.title = req.body.title;
            tag.slug = slugify(req.body.title);
            tag.describe = req.body.describe;
            tag.parent_id = req.body.parent_id;

            await tag.save();
            res.send(responseSuccess("", tag));
        } catch (err) {
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
            return res.send(responseFailure("", { errors: error.message }));
        }
    },
};

export default TagController;
