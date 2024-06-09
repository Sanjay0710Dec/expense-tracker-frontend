import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../utils/Input';
import Button from '../utils/Button';

function ChangePassword() {
    const[PasswordDetails,setPasswordDetails] = useState({
        password:'',
        password1:'',
        isReadyToVerify:false
    });
    const[passwordType,setPasswordType] = useState('password')
    const navigate = useNavigate();
    const sendDetails = async() =>{
        try {
             if(PasswordDetails.password !== PasswordDetails.password1){
                setPasswordDetails((PasswordDetails) =>({...PasswordDetails,password:'',password1:'',isReadyToVerify:false}));
                alert('password and verify-password should match')
                return;
                
             }
            const sec_id = sessionStorage.getItem('sec_id');
            const response = await  fetch(`${import.meta.env.VITE_HOST}/api/v1/user/changepass`,{
                method:'PUT',
                body:JSON.stringify({sec_id:sec_id,password:PasswordDetails.password}),
                headers:{
                    'Content-Type':'application/json'
                }
             });
             const data = await response.json();
    
             if(data.success){
                alert(data.data?.message);
                sessionStorage.removeItem('sec_id');
                navigate('/auth/login')
                return;
                

             }
             else{
                 alert(data?.message);
               
             }
        } 
        catch (error) {
           
            alert('failed in connecting to server please try after some time')
        }
     
        sessionStorage.removeItem('sec_id');
        setPasswordDetails((PasswordDetails) =>({...PasswordDetails,password:'',password1:'',isReadyToVerify:false}));
        navigate('/auth/verify-email')

       
    }
    useEffect(function(){
    if(PasswordDetails.isReadyToVerify){
                 sendDetails();
          }
    },[PasswordDetails.isReadyToVerify])
  return (
    <div className='h-screen  flex justify-center items-center bg-[#212529]'>
    <div className='min-w-[95%] sm:min-w-[500px] px-2 pt-2 text-white '>
    <Input id={'password'} label={'Password'} value={PasswordDetails.password} inputType={passwordType} placeholder={'ex:Johndoe@099'}  reminder={''} title={'Password must contain at least 8 characters , 1 Uppercase, 1 special character, 2 numbers'} onchange={(e) => {
                   setPasswordDetails((PasswordDetails) =>({...PasswordDetails,password:e.target.value}));
            }} passwordType={passwordType} setPasswordType={setPasswordType} />
               <Input id={'password1'} label={'Enter Password Again'} value={PasswordDetails.password1} inputType={passwordType} placeholder={'ex:Johndoe@099'}  reminder={''} title={'Password must contain at least 8 characters , 1 Uppercase, 1 special character, 2 numbers'} onchange={(e) => {
                   setPasswordDetails((PasswordDetails) =>({...PasswordDetails,password1:e.target.value}));
            }} passwordType={passwordType} setPasswordType={setPasswordType} />
     <Button onClick={() =>{
             setPasswordDetails((PasswordDetails) =>({...PasswordDetails,isReadyToVerify:true}));
     }} label={'Submit'}/>
    </div>

</div>
  )
}

export default ChangePassword
