import express from "express";
import User from "../schemas/userSchema.js";
const app = express();
const router = express.Router();
import bcrypt from "bcrypt";

router.get("/", (req, res) => {
  res.send("Hello from transactionRoutes!");
});


router.post("/new",async(req,res)=>{
  const {to,from,type,amount}=req.body;
  const toPerson=await User.findOne({username:to});
  if(!toPerson){
    res.send("Recipient not found!");
  }
  const fromPerson=await User.findOne({username:from});
  if(!fromPerson){
    res.send("Sender not found!");
  }
  switch(type)
  {
    //we only want to display the net balance even if not payable so that payment can be made all together like splitwise
    case "expense":
      fromPerson.netBalance-=amount;
      toPerson.netBalance+=amount;
      break;
    case "income":
      fromPerson.netBalance+=amount;
      toPerson.netBalance-=amount;
      break;
  }

})


export default router;