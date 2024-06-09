import React, { useState } from 'react'

function PasswordIcon({passwordType,setPasswordType , textWhite}) {
    const[iconClass,setIconClass] = useState('far fa-eye')
  return (

      <span className={` ml-2  ${textWhite ? 'text-white':'text-black'}`} onClick={() =>{
      
                        if(passwordType === 'password'){
                          setPasswordType('text');
                          setIconClass('far fa-eye-slash')
                        }
                        else{
                          setPasswordType('password');
                          setIconClass('far fa-eye')
                        }
                  }}><i id="toggler"className={`${iconClass} text-2xl`}></i></span>
  
  )
}

export default PasswordIcon
