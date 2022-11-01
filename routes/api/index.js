import clientRouter from "./client";
import adminRouter from "./admin";

const router = (app) => {
    app.use("/api", clientRouter);
    app.use("/api/admin", adminRouter);
};

export default router;
