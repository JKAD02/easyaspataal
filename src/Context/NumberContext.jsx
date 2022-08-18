import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const NumberContext = createContext()

export const NumberContextProvider = ({ children }) => {
    const [phoneNumber, setPhoneNumber] = useState("")

    const getPhoneNumber = (number) => {
        setPhoneNumber(number)
    }

    return <NumberContext.Provider value={{ phoneNumber, getPhoneNumber }}>{children}</NumberContext.Provider>
}
