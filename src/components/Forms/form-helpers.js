/* eslint-disable */

import React from 'react'

export  function ValidationError(props) {
    if(props.message) {
      return <div className="error">{props.message}</div>
    }
    return <></>
}

export function validateName(firstname='',lastname='') {
    const validLetters= /^[A-Za-z]+$/
    const fullname= firstname+lastname
    if(firstname.length===0 || lastname.length===0) {
        return `First/Last names are required`
    }
    if(firstname.length<2||lastname.length<2) {
        return `Name is too short`
    }
    if(!validLetters.test(fullname)) {
        return `Names must contain only valid letters`
    }
    /*
    if ((!validLetters.test(firstname))||(!validLetters.test(lastname))) {
        return `Names must contain only valid letters`
    }*/
    return null
}

export function validatePassword(password='') {
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
    if(password.length===0) {
        return 'Password is required'
    }
    if(password.length<8){
        return 'Password must be longer than 8 characters'
    }
    if(password.length>72){
        return 'Password must be shorter than 72 characters'
    }
    if(password.startsWith(' ')||password.endsWith(' ')){
        return 'Password must not start or end with empty spaces'
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)){
        return 'Password must contain 1 upper case,lower case,number and special character'
    }
    return null

}

export function validateUsername(userList=[],username='') {
    //username= username.trim.toLocaleLowerCase()
    const usernameExists= userList.find(user=>user.username===username)
    if (usernameExists) return 'Username already exists'
    return null
}


  
