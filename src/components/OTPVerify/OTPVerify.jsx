import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NumberContext } from '../../Context/NumberContext'
import { IMG } from '../../images/img'
import styles from "./OTPVerify.module.css"
import OtpInput from "react-otp-input";

const OTPVerify = () => {
  const [otpNumber, setOtpNumber] = useState("")
  const [isVerfiy, setIsVerfiy] = useState(false)
  const [message, setMessage] = useState({
    status: "",
    text: ""
  })
  const { phoneNumber } = useContext(NumberContext)
  const navigator = useNavigate()

  const getOtpNumber = (number) => {
    setOtpNumber(number)
    number.length === 4 && handleVerfication(number)
  }

  const handleVerfication = (number) => {
    setIsVerfiy(true)

    axios.post("https://fintech-backend-staging.easyaspataal.com/api/phone_numbers/verify_otp", {
      phoneNumber: phoneNumber,
      otp: number
    }).then((res) => {
      setTimeout(() => {
        setIsVerfiy(false)
        setMessage({ status: true, text: "Verify SuccessFully" })
      }, 2000)
    }).catch((err) => {
      setTimeout(() => {
        setIsVerfiy(false)
        setMessage({ status: false, text: err.response.data.message })
      }, 2000)
    })
  }

  return (
    <div className={styles.main_Div}>
      <img src={IMG} width="100%" alt="" />

      <div className={message.status ? styles.green : styles.red}>{message.text}</div>

      <h1>Please enter the 4 digit code sent to you on {phoneNumber} </h1>

      <div className={styles.inputDiv}>
        <OtpInput
          value={otpNumber}
          onChange={otp => getOtpNumber(otp)}
          numInputs={4}
          separator={<span>&nbsp;&nbsp;&nbsp;</span>}
        />
      </div>

      {isVerfiy && <div className={styles.spinner}></div>}

      {message.status ? <button onClick={() => {
        navigator("/home")
      }}>
        Home
      </button> : <button onClick={() => {
        navigator("/")
      }}>
        Resend Code
      </button>}
    </div>
  )
}

export default OTPVerify