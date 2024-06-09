import React, { useContext } from 'react'
import { ProfileContextAndUserPurchases } from '../../contexts';



function UpdateProfile() {
const fileExtensionRegex = /\.(jpg|png)$/
const{setLoadProfile} = useContext(ProfileContextAndUserPurchases);
    const handleSubmit = async (e) =>{
         e.preventDefault();
        
           if(!fileExtensionRegex.test(e.target.profile.files[0].name)){
                  alert('file extension should be either jpg or png');
                  return;
           }
        const formData = new FormData();
        formData.append('profile', e.target.profile.files[0]);
        try {
                const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/auth/uploadprofile`,{
                    method:'POST',
                    body:formData,
                    headers:{
                     
                      'Authorization': sessionStorage.getItem('auth_token'),
                   
                      
                    }
                });
                if(response.status === 401){
                  alert(response.statusText);
                   sessionStorage.removeItem('auth_token')
                      navigate('/auth/login');
                }
                const data = await response.json();
                if(data?.success){
                  setLoadProfile(true);
                    alert(data?.data?.message);
                  
               
                   
                } 
                else{
                    alert(data.message);  
                }
        } catch (error) {
       
            alert('failed in connecting to server please try after some time')  
        }
    }
   
  return (
    <div className=' p-2 shadow-md shadow-orange-300 '>
       <form  onSubmit={handleSubmit} encType='multipart/form-data'  className=' flex flex-col gap-y-2 justify-between sm:flex-row p-1'>
         <div className='flex flex-col gap-y-1'>
         <label htmlFor="profile" className='text-xl font-medium cursor-pointer' >Update Profile</label>
         <input type="file" name="profile" id="profile" required  />
         </div>
         <button type='submit' className='bg-[#0D6EFD] px-4 py-2 text-xl rounded-lg'>update</button>
       </form>
    </div>
  )
}

export default UpdateProfile
