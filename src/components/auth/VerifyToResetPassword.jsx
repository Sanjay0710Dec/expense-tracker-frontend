import React, { useCallback, useEffect, useState } from 'react'
import Input from '../utils/Input'
import Button from '../utils/Button'
import { useNavigate } from 'react-router-dom';

function VerifyToResetPassword() {
    const[email,setEmail] = useState('');
    const[isReadyToVerify,setisReadyToVerify] = useState(false);
    const navigate = useNavigate();
    const sendDetails = async() =>{
        try {
            const response = await  fetch(`${import.meta.env.VITE_HOST}/api/v1/user/forgotpass`,{
                method:'PUT',
                body:JSON.stringify({email:email}),
                headers:{
                    'Content-Type':'application/json'
                }
             });
             if(response.status === 411){
                navigate('/auth/signup')
             }
             const data = await response.json();
             if(data.success){
                alert(data.data?.message);
                sessionStorage.setItem("sec_id",data?.data?.sec_id ? data.data.sec_id : '' );
                 navigate('/auth/verify-otp')

             }else{
                console.log('i entered')
                 alert(data?.message);
             }
        } catch (error) {
            console.log(error.message);
            alert('failed in connecting to server please try after some time')
        }
        setEmail("");
        setisReadyToVerify(false);
    }
    useEffect(function(){
    if(isReadyToVerify){
                 sendDetails();
          }
    },[isReadyToVerify])
   
  return (
    <div className='min-h-screen  flex justify-center items-center bg-[#212529]'>
        <div className='min-w-[95%] sm:min-w-[500px] px-2 pt-2 text-white '>
        <Input id={'email'} label={"Enter Email"} value={email} placeholder={"ex:johndoe@gmail.com"}  reminder={''} title={''} onchange={(e) =>{
              setEmail(e.target.value);
        }} passwordType={''} setPasswordType={''}/>
         <Button onClick={() =>{
             setisReadyToVerify(true);
         }} label={'Submit'}/>
        </div>

    </div>
  )
}

export default VerifyToResetPassword
