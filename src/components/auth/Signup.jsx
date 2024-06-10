import React from 'react'
import Intimate from './Intimate'
import Input from '../utils/Input'
import Button from '../utils/Button'
import '../../App.css'

import { useSignup } from '../../hooks/user'


function Signup() {
const [postInputs,passwordType,setpostInputs,doAlldetailsFilled,setPasswordType] = useSignup()

  return (
    <div className='min-h-screen  flex justify-center items-center bg-[#212529] pb-2'>
       <div className='min-w-[95%] sm:min-w-[500px] px-2 pt-2 text-white'>

        <div className='flex justify-center py-2 '><h1 className='text-3xl  font-medium'>Signup</h1></div>
        <Intimate IntimateContent={'Do you already have an account ?'} linkTo={'/auth/login'} label={'Login'}/>
         <div id='details-holder' className="mt-4">

            <Input id={'username'} label={'Username'} value={postInputs.username} inputType={'text'} placeholder={'ex: noob@developer(min of 6 chars)'}  reminder={'* cannot be changed'} title={'please fill this field'} onchange={(e) => {
                 setpostInputs((postInputs) =>({...postInputs, username:e.target.value}))
            }} passwordType={''} setPasswordType={''} />
            <Input id={'email'} label={'Email'} value={postInputs.email} inputType={'email'} placeholder={'ex:johndoe@gmail.com'} reminder={'* cannot be changed'} title={'please fill this field'} onchange={(e) => {
                 setpostInputs((postInputs) =>({...postInputs, email:e.target.value}))
            }} passwordType={''} setPasswordType={''} />
            <Input id={'fullname'} label={'Full Name'} value={postInputs.fullName} inputType={'text'} placeholder={'ex: john doe (min of 6 chars)'}  reminder={'* cannot be changed'} title={'please fill this field'} onchange={(e) => {
                 setpostInputs((postInputs) =>({...postInputs, fullName:e.target.value}))
            }} passwordType={''} setPasswordType={''} />
            <Input id={'password'} label={'Password'} value={postInputs.password} inputType={passwordType} placeholder={'ex:Johndoe@099'}  reminder={''} title={'Password must contain at least 8 characters , 1 Uppercase, 1 special character, 2 numbers'} onchange={(e) => {
                 setpostInputs((postInputs) =>({...postInputs, password:e.target.value}))
            }} passwordType={passwordType} setPasswordType={setPasswordType} />
             <div id='password-regex' className='mt-2 '>
                    <li>Password should be minimum of 8 Characters</li>
                    <li>{'Should Contain atleast 1 UpperCase(A-Z)'}</li>
                    <li>{'Should Contain atleast 1 Special Character(@$&^#%)'}</li>
                    <li>{'Should Contain atleast 2  Numbers'}</li>
                  </div>
   
            <Button label={'Submit'} onClick={doAlldetailsFilled}/>
         </div>

       </div>
    </div>
  )
}

export default Signup
