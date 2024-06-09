import React, { useEffect, useState } from 'react'
import Input from '../utils/Input'
import Button from '../utils/Button';
import { useNavigate } from 'react-router-dom';

function VerifyOtpOfForgotPassword() {
    const[otp,setOtp] = useState('');
    const[isReadyToVerify,setisReadyToVerify] = useState(false);
    const navigate = useNavigate();
    const verifyOtpHandler = async () =>{
             try {
                const sec_id = sessionStorage.getItem('sec_id');
                const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/verify-otp`,{
                  method:'PUT',
                  body:JSON.stringify({otp:otp,sec_id:sec_id}),
                  headers:{
                      'Content-Type':'application/json'
                  }
                });
  
                const data = await response.json();
                if(data.success){
                      sessionStorage.removeItem('sec_id');
                        alert(data.data.message);
                        sessionStorage.setItem('sec_id',data.data.sec_id);
                        navigate('/auth/reset-password');
                        return;
                }
                else{
                   alert(data.message);
                }
             } catch (error) {
                alert('failed in connecting to server please try after some time')
             }
             sessionStorage.removeItem('sec_id');
             navigate('/auth/verify-email')
             setOtp('');
             setisReadyToVerify(false);
    }
    useEffect(function(){
             if(isReadyToVerify){
                  verifyOtpHandler();
             }
    },[isReadyToVerify])
  return (
    <div className='h-screen  flex justify-center items-center bg-[#212529]'>
        <div className='min-w-[375px] w-[450px] px-2 pt-2 text-white '>
        <Input id={'otp'} label={'Enter Otp'} value={otp} inputType={'text'} placeholder={'ex:987689'}  reminder={''} title={'please fill this field'} onchange={(e) => {
                   setOtp(e.target.value);
            }} passwordType={''} setPasswordType={''} />
            <Button onClick={() =>{setisReadyToVerify(true)}} label={'Submit'}/>
        </div>
    </div>
  )
}

export default VerifyOtpOfForgotPassword
