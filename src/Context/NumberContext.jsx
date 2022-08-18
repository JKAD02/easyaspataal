import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const NumberContext = createContext()

export const NumberContextProvider = ({children}) => {
    const [phoneNumber,setPhoneNumber] = useState("")
    const [otpNumber,setOtpNumber] = useState("")


    const getPhoneNumber = (number) => {
        setPhoneNumber(number)
    }
    const getOtpNumber = (number) => {
        setOtpNumber(number)
    }

  return <NumberContext.Provider value={{phoneNumber,getPhoneNumber,otpNumber,getOtpNumber}}>{children}</NumberContext.Provider>
}
