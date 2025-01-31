import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { sign, verify } from "hono/jwt";
type Bind = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};
export const postRouter = new Hono<{
  Bindings: Bind;
}>();


//middleware
postRouter.use("/*", async (c, next) => {
  //get the header
  const header = c.req.header("Authorization")?.split(" ")[1] || "";
  console.log("header", header);
  //verify the header
  const response = await verify(header, c.env.JWT_SECRET);
  console.log("Middleware Response of jwt ", response);
  //if not then return 403
  if (!response.id) {
    return c.json({ error: "unAuthorised token" }, 403);
  }

  c.set("jwtPayload", response.id);
  //if correct proceed
  await next();
});

//create blog
postRouter.post("/post", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  const userId = c.get("jwtPayload");
  console.log("userId", userId);
  try {
    const body = await c.req.json();
    console.log(body);
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

///upadte blog
postRouter.put("/update", async (c) => {
  console.log("Route is reaching here");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get("jwtPayload");
    const body = await c.req.json();

    // Check if post exists and belongs to the user
    const postOfUser = await prisma.post.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!postOfUser || postOfUser.authorId !== userId) {
      return c.json({ message: "Post ID not valid or Unauthorized" }, 401);
    }
    // Build update data dynamically
    const data: Record<string, any> = {};
    if (body.title) data.title = body.title;
    if (body.content) data.content = body.content;
    console.log("data", data);
    const updatePost = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: data,
    });

    return c.json(
      {
        message: "post updated Suucesfully",
        updatePost: updatePost,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "post not updated",
        error: error,
      },
      500
    );
  }
});

//GET POST ON ID
postRouter.get("/get/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const getPost = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    if (!getPost) {
      return c.json(
        {
          message: `Post Doest not Exist for id ${id}`,
        },
        401
      );
    }

    return c.json(
      {
        message: `Got Blog for id ${id}`,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: `Something went Wrong`,
      },
      500
    );
  }
});

//GET ALL POST
postRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const getPost = await prisma.post.findMany();
    if (!getPost) {
      return c.json({
        message: "No Post To Show",
      });
    }
    return c.json({
      message: "Retrived all Blogs",
      post: getPost,
    });
  } catch (error) {
    return c.json({
      message: "Something went Wrong",
      error: error,
    });
  }
});
