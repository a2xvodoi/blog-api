import clientRouter from "./client";
import adminRouter from "./admin";
import { requireLogin } from "../../middlewares/auth";

const router = (app) => {
    app.use("/api", clientRouter);
    app.use("/api/admin", requireLogin, adminRouter);
};

export default router;
