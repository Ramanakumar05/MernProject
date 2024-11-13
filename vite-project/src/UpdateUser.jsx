import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
function UpdateUser() {

    // take id and store
    const {id}=useParams()

    console.log(useParams())
    // states
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [age,setAge]=useState();
// to navigate from router

    const navigate=useNavigate()

// updating the field value for editing the content

    useEffect(()=>
    {
        axios.get('http://localhost:3001/getUser/'+id).then(result=> {
            console.log(result.data) 
            setName(result.data.name) 
            setEmail(result.data.email)
            setAge(result.data.age)
        })
            
            .catch(err=> console.log(err))
    },[])
    // update button
    const Update=(e)=>
    {
        e.preventDefault();
        axios.put("http://localhost:3001/updateUser/"+id,{name,email,age})
        .then(result=>{
            console.log(result)
            navigate('/')
        })
        .catch(err=> console.log(err))
    }
  return (
    <div>
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h1>Update User</h1>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type='text' placeholder='Enter Name' className='form-control' value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type='email' placeholder='Enter Email' className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Age</label>
                        <input type='text' placeholder='Enter Age' className='form-control' value={age} onChange={(e)=>setAge(e.target.value)}/>
                    </div>

                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateUser