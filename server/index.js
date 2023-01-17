const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")


const app=express()

const PORT=4000

let idCounter=5
let users=[
    {id:1,name:"Nicat",surname:"Rzayev"},
    {id:2,name:"Seide",surname:"Mammadova"},
    {id:3,name:"Kamal",surname:"Lachinov"},
    {id:4,name:"Ali",surname:"Mammadov"}
]


app.use(cors())
app.use(bodyParser.json())

app.get("/",(req,res)=>{
res.send("<h1>Admin Panel</h1>")
})

//Get all users
app.get("/users",(req,res)=>{
    res.send(users)
})

//get user by id

app.get("/users/:id",(req,res)=>{
    const id=req.params.id
    //const {id}=req.params

    const selectUser=users.find(x=>x.id==id)

    if(selectUser){
        res.send(selectUser)
        res.status(200).json({message:"USer var"})
    }else{
        res.status(404).json({message:"User yoxdur"})
     
    }
})

//delete user

app.delete("/users/:id",(req,res)=>{
    const id=req.params.id
    users=users.filter(x=>x.id!=id)
    res.send(users)
    res.status(200).json({message:"deleted"})
})

//add user
app.post("/users",(req,res)=>{
    const userObj={
        id:idCounter++,
        name:req.body.name,
        surname:req.body.surname
    }
    users.push(userObj)
    res.send(users)
})

//Update User
app.put("/users/:id",(req,res)=>{
    const {id}=req.params

    users=users.filter(x=>x.id!=id)

    const updateUser={
        id:id,
        name:req.body.name,
        surname:req.body.surname
    }
    users.push(updateUser)
    users.sort((a,b)=>a.id-b.id)
    res.send(users)
})



app.listen(PORT,()=>{
    console.log("Server running");
})

