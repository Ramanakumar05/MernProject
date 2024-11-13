import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Users() {
  const [users,setusers]=useState([])



useEffect(()=>
{
  axios.get('http://localhost:3001').then(result=> setusers(result.data)).catch(err=> console.log(err))
},[])


  // delect
  const handleDelect=(id)=>
    {
      axios.delete('http://localhost:3001/delectUser/'+id)
      .then(res=> {
        console.log(res)
        window.location.reload()
      })
      .catch(err=>console.log(err))
    }

  return (
    <div>
    <p>
      User Page
    </p>
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
          <div className='w-50 bg-white rounted p-3'>
            {/* button for creating the user */}

            <Link to="/create" className='btn btn-success'>Add+</Link>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
                  {
                    users.map((user)=>
                    {
                      return  <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>
                        <Link to={`/update/${user._id}`} className='btn btn-success'>Edit</Link>
                          <button className='btn btn-danger' onClick={(e)=> handleDelect(user._id)}>Delect</button>
                        </td>
                      </tr>
                    })
                  }
              <tbody>

              </tbody>
            </table>
          </div>
        
        </div>
    </div>
  )
}

export default Users;