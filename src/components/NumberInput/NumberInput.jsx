import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NumberContext } from '../../Context/NumberContext'
import {IMG} from "../../images/img"
import styles from "./NumberInput.module.css"

const NumberInput = () => {
  const [isLoading,setLoading] = useState(false)
  const [message,setMessage] = useState({
    status:"",
    text:""
  })
  const navigate = useNavigate()
  const {phoneNumber,getPhoneNumber} = useContext(NumberContext)
  
  const getNumber = (e)=> {
    getPhoneNumber(e.target.value.toString())
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    setLoading(true)

    axios.post("https://fintech-backend-staging.easyaspataal.com/api/phone_numbers/send_otp",{
      phoneNumber
    }).then((data)=>{

      setTimeout(()=>{
        setLoading(false)
        setMessage({status:true,text:`Your OTP is: ${data.data.otp}`})
      },3000)
    }).catch((err)=>{
      setTimeout(()=>{
        setLoading(false)
        setMessage({status:false,text:err.response.data.message})
      },2000)
    })
  }
  
  return (
    <div className={styles.main_Div}>
       <img src={IMG} width="80%" alt="" />
       <div className={message.status ? styles.green : styles.red}>{message.text}</div>
       <h1>Please enter your phone number</h1>
       <div className={styles.divTag}>We need this to send a verfication code</div>
       <form onSubmit={handleSubmit} >
          <input disabled={message.status}  type="number" name="Number" placeholder='Enter Phone Number' onChange={getNumber} />
          {/* <input type="submit" value="Send OTP" /> */}
       </form>
       {isLoading && (<div className={styles.loading}>...Sending OTP</div>)}
       {message.status && <button  onClick={()=>{
           navigate("/verify")
       }}>Verify OTP</button>}
    </div>
  )
}

export default NumberInput