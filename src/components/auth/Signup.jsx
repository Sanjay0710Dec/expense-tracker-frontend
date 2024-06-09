import React from 'react'
import Intimate from './Intimate'
import Input from '../utils/Input'
import Button from '../utils/Button'
import '../../App.css'

import { useSignup } from '../../hooks/user'


function Signup() {
const [postInputs,passwordType,setpostInputs,doAlldetailsFilled,setPasswordType] = useSignup()

  return (
    <div className='h-screen  flex justify-center items-center bg-[#212529]'>
       <div className='min-w-[375px] w-[450px] px-2 pt-2 text-white'>

        <div className='flex justify-center py-2 '><h1 className='text-3xl  font-medium'>Signup</h1></div>
        <Intimate IntimateContent={'Do you already have an account ?'} linkTo={'/auth/login'} label={'Login'}/>
         <div id='details-holder' className="mt-4">

            <Input id={'username'} label={'Username'} value={postInputs.username} inputType={'text'} placeholder={'Enter your username'}  reminder={'* cannot be changed'} title={'please fill this field'} onchange={(e) => {
                 setpostInputs((postInputs) =>({...postInputs, username:e.target.value}))
            }} passwordType={''} setPasswordType={''} />
            <Input id={'email'} label={'Email'} value={postInputs.email} inputType={'email'} placeholder={'ex:johndoe@gmail.com'} reminder={'* cannot be changed'} title={'please fill this field'} onchange={(e) => {
                 setpostInputs((postInputs) =>({...postInputs, email:e.target.value}))
            }} passwordType={''} setPasswordType={''} />
            <Input id={'fullname'} label={'Full Name'} value={postInputs.fullName} inputType={'text'} placeholder={'john doe'}  reminder={'* cannot be changed'} title={'please fill this field'} onchange={(e) => {
                 setpostInputs((postInputs) =>({...postInputs, fullName:e.target.value}))
            }} passwordType={''} setPasswordType={''} />
            <Input id={'password'} label={'Password'} value={postInputs.password} inputType={passwordType} placeholder={'ex:Johndoe@099'}  reminder={''} title={'Password must contain at least 8 characters , 1 Uppercase, 1 special character, 2 numbers'} onchange={(e) => {
                 setpostInputs((postInputs) =>({...postInputs, password:e.target.value}))
            }} passwordType={passwordType} setPasswordType={setPasswordType} />
   
            <Button label={'Submit'} onClick={doAlldetailsFilled}/>
         </div>

       </div>
    </div>
  )
}

export default Signup
