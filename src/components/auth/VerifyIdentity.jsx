import React, { useEffect, useState,useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../utils/Button';
import Input from '../utils/Input';
function VerifyIdentity() {
    const[otp,setotp] = useState('');
    const [isReadyToVerify, setisReadyToVerify] = useState(false);
   const navigate = useNavigate();
    const doAlldetailsFilled = useCallback(function(){
         setisReadyToVerify(true);
        
    });
    async function sendOtpToVerifyUser(){
              try {
                const sec_id = sessionStorage.getItem('sec_id') || null;
                const options = {
                    otp:otp,
                    sec_id:sec_id
                };
                const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/signup`,{
                  method:'POST',
                  body:JSON.stringify(options),
                  headers:{
                      'Content-Type':'application/json'
                  }
              });
              const data = await response.json();
              
                      if(data?.success){ 
                        sessionStorage.removeItem('sec_id');
                        alert(data?.data?.message)
                          navigate('/auth/login')
                          return;
                    } else{
                    
                        alert(data?.message);
                    }
              } catch (error) {
                alert('failed in connecting to server please try after some time')
              }
               sessionStorage.removeItem('sec_id');
               navigate('/auth/signup')
          
    }
    useEffect(function(){
              if(isReadyToVerify){
                   sendOtpToVerifyUser();       
              }
             
    },[isReadyToVerify])
  return (
    <div className='h-screen  flex justify-center items-center bg-[#212529]'>
    <div className='min-w-[375px] w-[450px] px-2 pt-2 text-white'>
     <div className='flex justify-center py-2 '><h1 className='text-3xl  font-medium'>Verify Your Identity</h1></div>

      <div id='details-holder' className="mt-4">
         <Input id={'otp'} value={otp} label={'Enter OTP'} inputType={'text'} placeholder={'ex:985634'} reminder={''} title={'please fill this field'}  onchange={(e) =>{
          
              setotp(e.target.value)
         }}  passwordType={''} setPasswordType={''} />
         <Button label={'Submit'} onClick={doAlldetailsFilled}/>
      </div>

    </div>
 </div>
  )
}

export default VerifyIdentity
