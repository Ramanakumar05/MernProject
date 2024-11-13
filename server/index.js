const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json())

// model
const UserModel=require('./model/users')

// connection

mongoose.connect("mongodb://localhost:27017/code-with")


app.post('/create',(req,res)=>
{
    UserModel.create(req.body)
    .then(users=>res.json(users)).catch(err=>res.json(err))
    console.log(req.body)
})

app.get('/',(req,res)=>
{
    UserModel.find({})
    .then(users=>res.json(users))
    .catch(err=> res.json(err))
})


app.get('/getUser/:id',(req,res)=>
{
    const id=req.params.id;
    console.log("here in the update user line 32",req.params)
    UserModel.findById({_id:id})
    .then(user=>res.json(user))
    .catch(err=> res.json(err))
})


app.put('/updateUser/:id',(req,res)=>
{
    // get id
    const id=req.params.id;

    console.log("change name from the body",req.body.name)
    
    UserModel.findByIdAndUpdate({_id:id},
    {
        name:req.body.name, 
        email:req.body.email, 
        age:req.body.age
    })
    .then(users=>{
            res.json(users)
        })
    .catch(err=>res.json(err))
})

// delect

app.delete('/delectUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id}).then(res=>{ 
        res.json(res)
        window.location.reload()
    }).catch(err=>res.json(err))
})
app.listen(3001,()=>
{
    console.log("server is running")
})