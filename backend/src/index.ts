import { Hono } from "hono";

import { userRouter } from "./Routes/user";
import { postRouter } from "./Routes/post";

// type Bindings = {
//   DATABASE_URL: string;
//   JWT_SECRET: string;
// };

const app = new Hono().basePath("/api/v1");
app.route("/user/", userRouter);
app.route("/blog/", postRouter);
//middlewears

export default app;
