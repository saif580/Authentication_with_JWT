require("dotenv").config();
const express=require('express');
const app=express();
const userRouter=require("./api/users/user.router")

// app.get('/',(req,res)=>{
//     res.send("SAIF")
// });
// app.get('/api',(req,res)=>{
//     res.json({
//         success:1,
//         message:"Working"
//     });
// });
app.use(express.json());
app.use("/api/users",userRouter);

app.listen(process.env.APP_PORT,()=>{
    console.log("Server is runnning");
})