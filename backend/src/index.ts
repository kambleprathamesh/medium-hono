import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api/v1");

app.post("/auth/signup", async (c) => {
  // Ensure the DATABASE_URL is properly set in your environment variables
 const prisma=new PrismaClient({
  datasourceUrl:c.env.DATABASE_URL
 }).$extends(withAccelerate());

  const body = await c.req.json();

  // Check if user already exists
  const userExist = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (userExist) {
    return c.json({ message: "User already exists" },200);
  }

  // Create new user
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password, 
    },
  });

  return c.json({
    message: "User created successfully",
    user,
  });
});




app.post("/blog/post",(c)=>{
  return c.text("greaat posted blog")
})


app.put("/blog/update",(c)=>{
  return c.text("Blog updated")
})


app.get("/blog/get/:id",(c)=>{

  const id=c.req.param('id');
  return c.json({
    message:`Got Blog for id ${id}`
  })
})


app.get("/blog/bulk",(c)=>{
  return c.json({
    message:"Retrived all Blogs"
  })
});


export default app;