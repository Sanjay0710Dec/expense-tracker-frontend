import React ,{useCallback} from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../../src/index.css'
import logo from '../assets/male-female.png'
import { ProfileContextAndUserPurchases } from '../contexts';
import { useDashBoardDetails } from '../hooks/dashboardDetails';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const[togglebtnClass,dropDownMenuDisplay,userPurchaseDetails,loadProfile,profile,settogglebtnClass,setdropDownMenuDisplay,setLoadProfile,setUserPurchaseDetails]
 = useDashBoardDetails();
   const handleLogout = useCallback(function(){
        sessionStorage.removeItem('auth_token');
        navigate('/auth/login')
   },[])

  return (
    <div id='dashboard' className='min-h-screen bg-black/95 text-white'>
      <div className='sticky top-0 z-50 bg-white text-black '>
        <header className='relative px-5'>
                    <div id="nav-bar" className=' h-32   flex items-center justify-between px-4  '>
                    <div id="logo-app-name-holder" className='flex items-center'>
                    <img width="48" height="48" src="https://img.icons8.com/material-rounded/48/cost.png" alt="cost" className='rounded-lg'/>
                    <div id="hero" className='ml-2'>
                      <h1 className='sm:text-2xl sm:font-semibold'><Link to={'/user/purchases'}>Expense-Tracker</Link></h1>
                    </div>
                    </div>
                    <ul id="pages-links-holder" className=' hidden lg:flex  px-16 py-3 gap-x-9 text-xl font-medium'>
                      <li className=' border-2 border-black text-black px-5 py-3 rounded-md cursor-pointer'><Link to={'/user/analytics'}>analytics</Link></li>
                      <li className=' border-2 border-black text-black px-7 py-3  rounded-md cursor-pointer' onClick={handleLogout}>logout</li>
                    
                    </ul>
                    <div className=' h-16 w-16  cursor-pointer hidden  lg:block'><Link to={'/user/info'}><img src={profile === 'no_id' ? '/male-female.png': profile} className='block w-full h-full border border-black  rounded-2xl'/>userInfo</Link></div>
                    <div className="toggle-btn text-2xl sm:text-3xl block lg:hidden z-10  cursor-pointer" onClick={() =>{
                        if(togglebtnClass === "fa-solid fa-bars"){
                            settogglebtnClass("fa-solid fa-xmark");
                            setdropDownMenuDisplay("flex")
                        }
                        else{
                          settogglebtnClass("fa-solid fa-bars");
                          setdropDownMenuDisplay("hidden")
                        }
                    }}><i className={togglebtnClass}></i></div>
                    
        </div>
            <div className={`drop-down ${dropDownMenuDisplay} flex-col justify-evenly items-center lg:hidden absolute w-[150px] sm:w-[300px] h-[300px] top-14 right-9  bg-gray-200/40`}>
              <div className='h-16 w-16 cursor-pointer pl-2 pt-2 '><Link to={'/user/info'}><img src={profile === 'no_id' ? logo: profile} className='block w-full h-full rounded-2xl border border-black'/>userInfo</Link></div>
              <ul id='links' className='flex flex-col gap-y-7 px-3'>
                      <li className=' bg-black text-white  px-7 py-3 rounded-md'><Link to={'/user/analytics'}>analytics</Link></li>
                      <li className='bg-black text-white px-9 py-3  rounded-md cursor-pointer' onClick={handleLogout}>logout</li>
                </ul>
            </div>
        </header>
     </div> 
             
            <ProfileContextAndUserPurchases.Provider value={{loadProfile,setLoadProfile,userPurchaseDetails,setUserPurchaseDetails}}>
                   <Outlet/>
            </ProfileContextAndUserPurchases.Provider>
          
    </div>
  )
}

export default Dashboard
  