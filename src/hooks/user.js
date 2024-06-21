import { useState,useCallback,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContextAndUserPurchases } from "../contexts";

export function useSignIn(){
    const[postInputs,setpostInputs] = useState({
      email:'',
      password:''
    });
    const navigate = useNavigate();
    const [isReadyToVerify, setisReadyToVerify] = useState(false)
    const[passwordType,setPasswordType] = useState('password')
    const doAlldetailsFilled = useCallback(function(){
         setisReadyToVerify(true)
    },[]);

   
  
            async function sendLoginDetails(){
              try {
              
                  const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/login`,{
                      method:'POST',
                      body:JSON.stringify(postInputs),
                      headers:{
                        'Content-Type':'application/json'
                      }
                  });
                  const data = await response.json();
                
                  if(data?.success){
                      sessionStorage.setItem("auth_token",`Bearer ${data?.data?.auth_token}`)
                        navigate('/user/purchases')
                  }
                  else{
                        alert(data?.message);
                  }
              } catch (error) {
          
           
                alert('failed in connecting to server please try after some time')
              }
              setpostInputs((postInputs) =>({...postInputs,email:'',password:''}));
              setisReadyToVerify(false);
          }

          useEffect(function(){
            if(isReadyToVerify){
              sendLoginDetails();       
            }
            
        },[isReadyToVerify]);
        
        useEffect(function(){
         
           sessionStorage.removeItem('auth_token');
        },[]);

        return [postInputs,passwordType,setpostInputs,doAlldetailsFilled,setPasswordType]
  }

  export function useSignup(){
    const[postInputs,setpostInputs] = useState({
        username:'',
        email:'',
        fullName:'',
        password:''
      });
      const navigate = useNavigate();
      const [isReadyToVerify, setisReadyToVerify] = useState(false);
      const[passwordType,setPasswordType] = useState('password');

      const doAlldetailsFilled = useCallback(function(){
           setisReadyToVerify(true);
          
      },[]);

      async function sendUserDetails(){
        try {
             const options = {
                  username:postInputs.username,
                  email:postInputs.email,
                  fullName:postInputs.fullName,
                  password:postInputs.password
               }
            const response = await  fetch(`${import.meta.env.VITE_HOST}/api/v1/user/verifyUser`,{
                  method:'POST',
                  body:JSON.stringify(options),
                  headers:{
                    'Content-Type':'application/json'
                  }
               });
               const data = await response.json();
               if(data.success){
                  sessionStorage.setItem('sec_id',data?.data?.sec_id);
                  alert(data?.data?.message);
                  navigate('/auth/verify-identity')
                
             }
             else{
               alert(data?.message);
             }
        } catch (error) {
                  alert('failed in connecting to server please try after some time')
                   
        }
         setpostInputs((postInputs) =>({
             ...postInputs,
             username:'',
             email:'',
             fullName:'',
             password:''
         }));
         setisReadyToVerify(false);
      
   }
     useEffect(function(){
           if(isReadyToVerify){
             sendUserDetails();
           }
     },[isReadyToVerify]);

     return [postInputs,passwordType,setpostInputs,doAlldetailsFilled,setPasswordType];
  }


  export function useDetails(){
   
    const [isLoading, setIsLoading] = useState(true);

    const[userDetails,setUserDetails] = useState({
       username:'',
       email:'',
       fullName:''
    });
    const navigate = useNavigate();
    
    const fetchUserDetails = async () =>{
      try {
        
          const response = await  fetch(`${import.meta.env.VITE_HOST}/api/v1/user/auth/details`,{
            method:'GET',
            headers:{
              'Authorization': sessionStorage.getItem('auth_token')
            }
          });
                if(response.status === 401){
                  alert(response.statusText);
                   sessionStorage.removeItem('auth-token');
                    navigate('/auth/login')
                    return;
                }
                const data = await response.json();
                if(data?.success){
                  const user = data?.data?.user;
                  setUserDetails((userDetails) =>({...userDetails,username:user.username,email:user.email,fullName:user.fullName}));
                  setIsLoading(false);
                }
                else{
                    alert(data?.message);
                }

             } 
          catch (error) {
            alert('failed in connecting to server please try after some time')  
          }
    }
    useEffect(function(){

     
              fetchUserDetails();
       
    },[]);
    return {isLoading,userDetails}
}

export function usePasswordUpdate(){
    const[password,setPassword] = useState('');
    const[passwordType,setPasswordType] = useState('password');
    const navigate = useNavigate();
    const[isreadyToFetch,setisreadyToFetch] = useState(false);
    const passwordUpdateHandler = async () =>{
      try {
        const auth_token = sessionStorage.getItem("auth_token");
        const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/auth/updatepass`,{
           method:'PUT',
           body:JSON.stringify({password:password}),
           headers:{
            'Authorization': auth_token,
            'Content-Type':'application/json'
          }
        });
       const data = await response.json();
       if(response.status === 401 || response.status === 200){
           const message = data.message ? data.message :data.data.message
             alert(message);
             sessionStorage.removeItem('auth-token');
             navigate('/auth/login')
        }
        else{
            alert(data.message);
        }
      } catch (error) {
        alert('failed in connecting to server please try after some time') 
      }
      setPassword(''); setisreadyToFetch(false);
    }
     
    useEffect(function(){
      if(isreadyToFetch){
        passwordUpdateHandler();
      }
    },[isreadyToFetch]);
  
    return [passwordType,setPasswordType,password,setPassword,setisreadyToFetch]
  }

  export function useDeletAccount(){
    const[deleteAcc,setDeleteAcc] = useState(false);
    const navigate = useNavigate();
    const handleDelete = async () =>{
      try {
              const auth_token = sessionStorage.getItem("auth_token");
              const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/auth/delete-account`,{
                method:'DELETE',
                headers:{
                  'Authorization': auth_token
                }
              });
              if(response.status === 401){
                alert(response.statusText);
                sessionStorage.removeItem('auth_token');
                navigate('/auth/login')
              }
              const data = await response.json();
                    if(data.success){
                            alert(data.data?.message);
                            navigate('/auth/signup')
                    }
                    else{
                      alert(data.message);
                    }
      }
       catch (error) {
        alert('failed in connecting to server please try after some time') 
      }
      setDeleteAcc(false);
    }
  
    useEffect(function(){
         
          if(deleteAcc){
            handleDelete();
          }
    },[deleteAcc]);
    
    return setDeleteAcc;
  }