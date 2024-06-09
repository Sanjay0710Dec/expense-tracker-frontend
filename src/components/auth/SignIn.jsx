import React from 'react'
import Intimate from './Intimate'
import Input from '../utils/Input'
import Button from '../utils/Button'
import { Link } from 'react-router-dom'
import { useSignIn } from '../../hooks/user'
function SignIn() {
 const [postInputs,passwordType,setpostInputs,doAlldetailsFilled,setPasswordType] = useSignIn();
 
  return (
    <div className='h-screen  flex justify-center items-center bg-[#212529]'>
       <div className='min-w-[375px] w-[450px] px-2 pt-2 text-white'>
        <div className='flex justify-center py-2 '><h1 className='text-3xl  font-medium'>Login</h1></div>
        <Intimate IntimateContent={"Don't have an account ?"} linkTo={'/auth/signup'} label={'Signup'}/>
         <div id='details-holder' className="mt-4">
            <Input id={'user-email'} value={postInputs.email} label={'Email'} inputType={'email'} placeholder={'ex:johndoe@gmail.com'}  reminder={''} title={'please fill this field'}   onchange={(e) => {
                 setpostInputs((postInputs) =>({...postInputs, email:e.target.value}))
            }}  passwordType={''} setPasswordType={''}  />

            <Input id={'user-password'} value={postInputs.password} label={'Password'} inputType={passwordType} placeholder={'ex:Johndoe@099'}  reminder={''} title={'Password must contain at least 8 characters , 1 Uppercase, 1 special character, 2 numbers'}  onchange={(e) => {
                 setpostInputs((postInputs) =>({...postInputs, password:e.target.value}))
            }} passwordType={passwordType} setPasswordType={setPasswordType} />
            <div className='text-red-500 cursor-pointer underline mt-0.5 ml-0.5'><Link to={'/auth/verify-email'}>forgot password?</Link></div>
            <Button label={'Submit'} onClick={doAlldetailsFilled}/>
         </div>

       </div>
    </div>
  )
}

export default SignIn
