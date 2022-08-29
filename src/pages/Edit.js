import React from 'react';
import { useEffect,useState } from 'react';
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";



const Edit = () => {

    const {id}=useParams();
    const navigate=useNavigate();
    const [input,setInput]=useState({
        name:"",
        email:"",
    });

    useEffect(()=>{
        try{
     const getSingleRecord=async()=>{
        const res= await axios.get(`http://localhost:8000/users/${id}`)
        setInput(res.data)
     }
     getSingleRecord();
        }catch(error){
            console.log(error)
        }
    },[id])

    const handleEditData=async(e)=>{
        e.preventDefault();
        try{
        await axios.put(`http://localhost:8000/users/${id}`,input);
        navigate("/");
        }catch(error){
        console.log(error)
        }
    }
  return (
    <>
     <div className='container'>
        <div className="row">
            <div className="col-md-12">
                <div className="text-center m-4 p-4"
                style={{backgroundColor:"blue"}}>
                    <h1 className='text-white'>Update Records</h1>

                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <form onSubmit={handleEditData}>
                    <div className="mb-3">
                        <label htmlFor='exampleInputEmail' className='form-lebel'>
                            Name
                        </label>
                        <input
                         onChange={(e)=> setInput({...input,[e.target.name]:e.target.value})}
                         value={input.name}
                        name='name'
                        type='text'
                        className='form-control'
                        id='exampleInputEmail'
                        aria-describedby='emailHelp'
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor='exampleInputPassword1' className='form-lebel'>
                            Email
                        </label>
                        <input
                        onChange={(e)=> setInput({...input,[e.target.name]:e.target.value})}
                         value={input.email}
                       
                        name='email'
                        type='email'
                        className='form-control'
                        id='exampleInputPassword1'
                        
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Update
                    </button>
                </form>
                <button onClick={()=>navigate("/")} className='btn btn-block btn-success mt-3'>
                    Go To Home
                </button>
            </div>
        </div>
     </div>   
    </>
  )
}

export default Edit