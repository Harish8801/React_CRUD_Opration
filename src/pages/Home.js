import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const [users,setUsers]=useState([]);
    const [render,setRender]=useState(false);
    const [input,setInput]=useState({
        name:"",
        email:"",
    })
  //  console.log(users)

    useEffect(()=>{
        try{
    const getAlldata=async ()=>{
      const res=await axios.get("http://localhost:8000/users");
      setUsers(res.data);
    };
    getAlldata();

        }catch(error){
            console.log(error)

        }

    },[render])

    const handleSubmit= async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8000/users",input)
          setRender(true);

    }

    const handleDelete= async(id)=>{
        await axios.delete(`http://localhost:8000/users/${id}`);
        const newUsers=users.filter((user)=>{
            return user.id !==id;
        })
        setUsers(newUsers)

    }
  return (
  <>
<div className="container">
    <div className="row">
        <div className="col-md-12">
        <div className='panel panel-primary text-center m-4 p-4'
         style={{backgroundColor:"blue"}}>
         <h1 className='text-white'>React JS CRUD API</h1>

        </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-6">
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="exampleInputEmail" className="form-lebel">
                        Name
                    </label>
                    <input 
                    name='name'
                    onChange={(e)=> setInput({...input,[e.target.name]:e.target.value})}
                    value={input.name}
                    type='text'
                    className='form-control'
                    id='exampleInputEmail'
                    aria-describedby='emailHelp'
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleInputPassword" className="form-lebel">
                        Email
                    </label>
                    <input 
                    name='email'
                    
                    onChange={(e)=> setInput({...input,[e.target.name]:e.target.value})}
                    value={input.email}
                    type='email'
                    className='form-control'
                    id='exampleInputPassword'
                    
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Submit</button>

            </form>
        </div>
        <div className='col-md-6'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>UPATE</th>
                        <th scope='col'>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users && users.map((user)=>{
                        return(
                            <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={`/edit/${user.id}`}>
                                <button className='btn btn-primary'>Edit</button>
                            </Link>
                        </td>
                        <td>
                    <button onClick={()=>handleDelete(user.id)}
                    className='btn btn-primary'>Delete</button>
                  </td>
                    </tr>
                        )
                    })
                }
                  
                </tbody>
            </table>
        </div>
    </div>
</div>
  </>
  )
}

export default Home
