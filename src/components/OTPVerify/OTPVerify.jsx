import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NumberContext } from '../../Context/NumberContext'
import { IMG } from '../../images/img'
import styles from "./OTPVerify.module.css"

const OTPVerify = () => {
  const [isVerfiy,setIsVerfiy] = useState(false)
  const [message,setMessage] = useState({
    status:"",
    text:""
  })
  const {phoneNumber,otpNumber,getOtpNumber} = useContext(NumberContext)
  const navigator = useNavigate()
  
  const getOtp = (e)=> {
    getOtpNumber(e.target.value.toString())
  }

  const handleVerfication = (e) => {
    e.preventDefault()
    setIsVerfiy(true)

    axios.post("https://fintech-backend-staging.easyaspataal.com/api/phone_numbers/verify_otp",{
        phoneNumber: phoneNumber,
        otp: otpNumber
    }).then((res)=>{
        setTimeout(()=>{
            setIsVerfiy(false)
            setMessage({status:true,text:"Verify SuccessFully"})
        },2000)
    }).catch((err)=>{
        setTimeout(()=>{
            setIsVerfiy(false)
            setMessage({status:false,text:err.response.data.message})
        },2000)
    })
  }

  return (
    <div className={styles.main_Div}>
        <img src={IMG} width="80%" alt="" />
        <div className={message.status ? styles.green : styles.red}>{message.text}</div>
        <h1>Please enter the 4 digit code sent to you on {phoneNumber} </h1>
       <form onSubmit={handleVerfication} >
          <input disabled={message.status} type="number" name="Number" placeholder='Enter OTP' onChange={getOtp} />
          {/* <input type="submit" value="Verify OTP" /> */}
       </form>
       <button  onClick={()=>{
           navigator("/home")
       }}>
        {message.status?"Home":"Resend Code"}
       </button>
       {isVerfiy && <div className={styles.loading}>...verifying Your OTP</div>}
    </div>
  )
}

export default OTPVerify