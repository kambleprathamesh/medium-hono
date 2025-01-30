import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { sign, verify } from "hono/jwt";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api/v1");

//middlewears
app.use("/blog/*", async (c, next) => {
  //get the header
  const header = c.req.header("Authorization")?.split(" ")[1] || "";
  console.log("header", header);
  //verify the header
  const resposne = await verify(header, c.env.JWT_SECRET);
  //if not then return 403
  if (!resposne.id) {
    return c.json({ error: "unAuthorised token" }, 403);
  }

  c.set("jwtPayload", resposne.id);
  //if correct proceed
  await next();
});

//signup route
app.post("/auth/signup", async (c) => {
  // Ensure the DATABASE_URL is properly set in your environment variables
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  // Check if user already exists
  const userExist = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (userExist) {
    return c.json({ message: "User already exists" }, 200);
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  console.log(hashPassword);

  // Create new user
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hashPassword,
    },
  });

  return c.json({
    message: "User created successfully",
    user,
  });
});

//signin route
app.post("/auth/sigin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });
  const body = await c.req.json();
  try {
    if (!body.email || !body.password) {
      return c.json(
        {
          message: "please fill all the details",
        },
        400
      );
    }
    const userExist = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!userExist) {
      return c.json(
        {
          message: "Please Signup or enter corect",
        },
        400
      );
    }

    const verifyPass = await bcrypt.compare(body.password, userExist.password);
    console.log("verifyPass", verifyPass);

    if (!verifyPass) {
      return c.json(
        {
          message: "Password Wrong!",
        },
        400
      );
    }

    const payload = {
      id: userExist.id,
      email: userExist.email,
      password: userExist.password,
    };
    console.log(c.env.JWT_SECRET);
    const jwt = await sign(payload, c.env.JWT_SECRET);
    console.log(jwt);

    return c.json(
      {
        message: "Logged in Succesfully",
        jwt: jwt,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "Server Error",
        error: error,
      },
      500
    );
  }
});

//create blog
app.post("/blog/post", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  const userId = c.get("jwtPayload");
  console.log("userId", userId);
  try {
    const body = await c.req.json();
    if (!body.title || !body.content) {
      return c.json({
        error: "please fill all details",
      });
    }

    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({
      message: "Post Created Suucessfully",
      newPost: newPost,
    });
  } catch (error) {
    return c.json({
      error: "Post Not Created.Something went Wrong",
    });
  }
});

app.put("/blog/update", (c) => {
  return c.text("Blog updated");
});

app.get("/blog/get/:id", (c) => {
  const id = c.req.param("id");
  return c.json({
    message: `Got Blog for id ${id}`,
  });
});

app.get("/blog/bulk", (c) => {
  return c.json({
    message: "Retrived all Blogs",
  });
});

export default app;
