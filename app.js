import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import cors from "cors";
import "dotenv/config";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import apiRouter from "./routes/api";

const app = express();
const port = process.env.PORT || "3000";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
apiRouter(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

export default app;
