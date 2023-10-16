const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const controller = require("./controllers/userController")
const db = require("./config/dbSQL")
const verifyToken = require("./middleware/verifyToken");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
db.connectAndQuery()
app.use(bodyParser.urlencoded({ extended: false }));

//routes

app.get("/users", async (req, res)=>{
  const users = await db.getAllusers()
  res.json(users);
})



//Register
app.post("/register", async(req, res)=>{
  const{email, passwor} = req.body;
  if(!email || !password){
    return res.status(401).json({message:'Todos los campos son requeridos'});    
  }
  const success = await db.createUser(email, password)

  if(success){
    res.status(201).json({message:'Usuario registrado'})
  }else{
    res.status(500).json({message:'Usuario no registrado'})
  }
})

//Login

app.post("/login", async(req, res)=>{
  const{email , password} = req.body;
  const token = await db.Login(email, password);

  if(token){
    res.status(202).json({message:"Login Success"})
  }else{
    res.status(401).json({message:"Invalid email or password"})
  }
})
//register

app.post('/register', async(req, res)=>{
  const {email, password}= req.body;

  const success = await db.createUser(email, password);
  if(success){
    res.status(201).json({message:"User registerd success"})
  }else{
    res.status(500).json({message:"not registered"})
  }

})


// start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
