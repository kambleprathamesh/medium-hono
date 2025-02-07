import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { signupInput, signin } from "@prathmeshkamble/medium-common";

type Binds = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};
export const userRouter = new Hono<{
  Bindings: Binds;
}>();

//signup route
userRouter.post("/auth/signup", async (c) => {
  // Ensure the DATABASE_URL is properly set in your environment variables
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { postInputs } = body;
  console.log(body);
  console.log("USER BODY IN SIGNUP", body);

  const { success } = signupInput.safeParse(postInputs);
  console.log("SUCCESS", success);
  if (!success) {
    return c.json({ message: "Please Fill All Details Correctly" }, 400);
  }

  // Check if user already exists
  const userExist = await prisma.user.findFirst({
    where: { email: postInputs.email },
  });

  if (userExist) {
    return c.json({ message: "User already exists" }, 200);
  }

  const hashPassword = await bcrypt.hash(postInputs.password, 10);
  console.log(hashPassword);

  // Create new user
  const user = await prisma.user.create({
    data: {
      email: postInputs.email,
      password: hashPassword,
      name: postInputs?.name,
    },
  });

  return c.json({
    message: "User created successfully",
    user,
  });
});

//signin route
userRouter.post("/auth/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  try {
    const body = await c.req.json();
    const { postInputs } = body;
    const { success } = signin.safeParse(postInputs);
    if (!success) {
      return c.json(
        {
          message: "please fill all the details",
        },
        400
      );
    }
    const userExist = await prisma.user.findUnique({
      where: {
        email: postInputs.email,
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

    const verifyPass = await bcrypt.compare(
      postInputs.password,
      userExist.password
    );
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
    };

    console.log(c.env.JWT_SECRET);
    const jwt = await sign(payload, c.env.JWT_SECRET);
    console.log("jwt", jwt);

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
