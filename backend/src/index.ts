// import { Hono } from 'hono'

// const app = new Hono()

// app.get('/', (c) => {
//   return c.text('Hello Hono!')
// })

// export default app


import{Hono } from "hono";

const app=new Hono().basePath("/api/v1");


app.post("/auth/SignUp",(c)=>{return c.text("hello Signup")})

app.post("/auth/sigin",(c)=>{
  return c.text("Hello Login")
})

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


