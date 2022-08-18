import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()
  return (
    <>
        <h1>Welcome to Home Page</h1>
        <button  onClick={()=>{
          navigate("/")
        }}>Log Out</button>
    </>
  )
}

export default Success