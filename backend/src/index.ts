import { Hono } from "hono";

import { userRouter } from "./Routes/user";
import { postRouter } from "./Routes/post";
import { cors } from "hono/cors";
// type Bindings = {
//   DATABASE_URL: string;
//   JWT_SECRET: string;
// };

const app = new Hono().basePath("/api/v1");
app.use("/*", cors());
app.route("/user", userRouter);
app.route("/blog", postRouter);
//middlewears

export default app;
