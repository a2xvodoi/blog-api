import clientRouter from "./client/index.mjs";
import adminRouter from "./admin/index.mjs";
import { requireLogin } from "../../middlewares/auth.mjs";

const router = (app) => {
    app.use("/api", clientRouter);
    app.use("/api/admin", requireLogin, adminRouter);
};

export default router;
