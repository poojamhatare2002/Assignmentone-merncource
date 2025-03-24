import mongoose from "mongoose";
const calculationschema=mongoose.Schema({

    expression:String,
    result:Number,
    createdAt: { type: Date, default: Date.now }
})

const calculatermodel= mongoose.model("Calculation",calculationschema);
export default calculatermodel;