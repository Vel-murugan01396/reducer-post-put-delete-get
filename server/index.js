const express=require("express");
const mongoose=require("mongoose")
const Dotenv=require("dotenv");
const { PostForm, GetForm, UpdateForm, DeleteForm } = require("./Controller/Controller");
const cors=require("cors")

const app=express();
app.use(express.json());
Dotenv.config();


app.use(cors())
app.post("/form",PostForm);
app.get("/form",GetForm);
app.put("/form/:id",UpdateForm);
app.delete("/form/:id",DeleteForm);


mongoose.connect(process.env.MONGO_URL,{

})
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`BE Connected${process.env.PORT}`)
        console.log("DB connected")
    })
})
.catch((error)=>{
    console.log(`${error} did not connect`)
})


