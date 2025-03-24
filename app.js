import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connect_to_be from "./databse/db.js";
import calculatermodel from "./model/calculator.model.js";
const app=express();
app.use(express.json());
app.use(cors());
connect_to_be();
app.post("/",async(req,res)=>{
    const {expression,result}=req.body;
    try{
        const newcalculation=new calculatermodel({expression,result});
        await newcalculation.save();
        res.status(201).json(newcalculation);
    }catch(err)
    {
        res.status(500).json({ error: err.message });
    }
    
});
app.get("/",async(req,res)=>{
    try{
        const Calculations=await calculatermodel.find().sort({createdAt: -1 });
        res.json(Calculations);
    }catch(err)
    {
        res.status(500).json({error:err.message});
    }
})
app.delete("/delete",async(req,res)=>{
    const Calculation=await calculatermodel.deleteMany();
    res.json(Calculation);
})
app.listen(4000,()=>{
    console.log("http://localhost:4000");
})