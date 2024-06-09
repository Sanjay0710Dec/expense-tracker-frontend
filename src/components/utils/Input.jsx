import React from 'react'
import PasswordIcon from './PasswordIcon'
function Input({id,label, value, inputType,placeholder,reminder,title,onchange,passwordType,setPasswordType}) {
 
  return (
    <div id='label-input-holder' className=' mt-3'>
      <label htmlFor={id} className='block sm:text-2xl   sm:font-medium mb-1'>{label} {reminder ? <i className='text-red-700 text-base font-bold'>{reminder}</i>:''}</label>
      <div id="icon-input" className={`${passwordType ? 'flex items-center justify-between bg-white pr-1 rounded':''}`}>
      <input className={`block ${passwordType ? 'w-[90%] outline-none':'w-full border border-black '}  h-10  pl-2  rounded text-l text-black `} id={id} value={value}  type={inputType} placeholder={placeholder} title={title} onChange={onchange} />
        {passwordType ? <PasswordIcon passwordType={passwordType} setPasswordType={setPasswordType} textWhite={false}/>:''}
      </div>
    </div>
  )
}

export default Input
