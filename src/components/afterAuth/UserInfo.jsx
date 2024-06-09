
import { useDeletAccount, useDetails, usePasswordUpdate } from '../../hooks/user';

import PasswordIcon from '../utils/PasswordIcon';
import UpdateProfile from './UpdateProfile';

function UserInfo() {
 const{isLoading,userDetails} = useDetails();
 const [passwordType,setPasswordType,password,setPassword,setisreadyToFetch] = usePasswordUpdate();
 const setDeleteAcc = useDeletAccount();


 if(isLoading){
 <div id='purchases-analytics-info-holder' className='text-black text-3xl'>Loading....</div>
}  
return (
    <div id='purchases-analytics-info-holder' className='flex justify-center items-center '>
      <div id="user-info" className=' p-3 min-w-[375px] w-[500px]'>
        <UpdateProfile/>
         <div className='mt-3 shadow-md p-2'>
            <label htmlFor="username" className='block sm:text-2xl  sm:font-medium mb-1' >Username</label>
            <input type="text" name="username" id="username" value={userDetails.username} readOnly className='block w-full  h-10  pl-2  rounded text-l text-black  border border-black' />
          </div>
         <div className='mt-3 shadow-md p-2'>
            <label htmlFor="email" className='block sm:text-2xl  sm:font-medium mb-1' >Email</label>
            <input type="text" name="email" id="email" value={userDetails.email} readOnly className='block w-full  h-10  pl-2  rounded text-l text-black  border border-black' />
         </div>
         <div className='mt-3 shadow-md p-2'>
            <label htmlFor="fullName" className='block sm:text-2xl  sm:font-medium mb-1' >fullName</label>
            <input type="text" name="fullName" id="fullName" value={userDetails.fullName} readOnly className='block w-full  h-10  pl-2  rounded text-l text-black  border border-black'  />
          </div>

          <div className='mt-3 shadow-md p-2'>
            <label htmlFor="password" className='block sm:text-2xl  sm:font-medium mb-1' >Password</label>
                  <div id="icon-input" className=' flex items-center  pr-1'>
                    
                  <input type={passwordType} id='password' value={password} name='password' placeholder='*********' className='block w-[90%]  h-10  pl-2  rounded text-l text-black  border border-black' onChange={(e) =>{
                      setPassword(e.target.value)
                  }} />
                   <PasswordIcon passwordType={passwordType} setPasswordType={setPasswordType} textWhite={true}/>
                  </div>
                  <div id='password-regex' className='mt-1'>
                    <li>Password should be minimum of 8 charactes</li>
                    <li>{'Should Contain atleast 1 UpperCase(A-Z)'}</li>
                    <li>{'Should Contain atleast 1 Special Character(@$&^#%)'}</li>
                    <li>{'Should Contain atleast 2  Numbers'}</li>
                  </div>
                    <div id='update-cancel-btns' className='  flex items-center pl-2 gap-x-4 py-1'>
                      <button type="submit" className='bg-[#0D6EFD]  px-5 py-2 text-xl rounded-lg' onClick={() =>{
                        setisreadyToFetch(true);
                    }}>update</button>
                    <button type="submit" className='bg-[#0D6EFD]  px-5 py-2 text-xl rounded-lg' onClick={() =>{
                          setPassword('');
                    }}>cancel</button>
                    </div>
          </div>
           <div id="delete-acc-btn" className='mt-3 shadow-md'>
           <button className=' bg-red-600 block w-full py-2 rounded-md text-center text-xl' onClick={() =>{
                   setDeleteAcc(true);
           }}>Delete Account</button>
           </div>
      </div>
    </div>
  )
}

export default UserInfo
