import mongoose from "mongoose";
const connect_to_be= ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/calculator").then(()=>{
        console.log("connected to databse");
    }).catch(()=>{
        console.log(" not connected to databse");
    })
}
export default connect_to_be;