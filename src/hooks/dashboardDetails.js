import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function useDashBoardDetails(){
    const [togglebtnClass, settogglebtnClass] = useState("fa-solid fa-bars");
    const [dropDownMenuDisplay, setdropDownMenuDisplay] = useState('hidden');
    const[userPurchaseDetails,setUserPurchaseDetails] = useState([]);
    const[loadProfile, setLoadProfile] = useState(true);
    const[profile,setProfile] = useState('no_id');
    const navigate = useNavigate();
   

    const loadProfileHandler = async () =>{
        try {
            const auth_token =  sessionStorage.getItem('auth_token')
            const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/auth/profile`,{
              method:'GET',
              headers:{
                'Authorization': auth_token ? auth_token : ''
              }
            });
                    if(response.status === 401){
                        alert('un-authorized')
                        sessionStorage.removeItem('auth_token')
                        navigate('/auth/login')
                        return;
                    } 
                    const data = await response.json();
                      
                        if(data?.success){
                            setProfile(data.data.user.profileUrl);
                            setLoadProfile(false);
                           

                        }
                        else{
                            alert(data?.message);
                        }
        } catch (error) {
            alert('failed in connecting to server please try after some time') 
        }
    }
    useEffect(function(){
           if(loadProfile){
                loadProfileHandler();
           }
    },[loadProfile]);

    return [togglebtnClass,dropDownMenuDisplay,userPurchaseDetails,loadProfile,profile,settogglebtnClass,setdropDownMenuDisplay,setLoadProfile,setUserPurchaseDetails]
}