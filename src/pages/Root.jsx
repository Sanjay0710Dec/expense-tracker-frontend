import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

function Root() {
  const [navBarDisplay, setNavBarDisplay] = useState('hidden');
  const [quoteDisplay, setQuoteDisplay] = useState('flex');
  useEffect(function () {
    const setDisplay = setTimeout(function () {
      setNavBarDisplay('flex');
      setQuoteDisplay('hidden')
    }, 4000);

    return () => {
      clearTimeout(setDisplay);
    }
  }, [])
  return (
    <div id='main-div' className='bg-black/90 text-white min-h-screen flex items-center justify-center relative'>
      <div id="quote-container" className={`${quoteDisplay} flex-col  items-center justify-center min-h-72 text-3xl font-medium px-2`}>
        <li className='text-center'>Are you tired of Writing your expenses in book Then ,</li>
        <li className='text-pink-500/50 text-center'>try expense tracker</li>
        <li className='text-center'> Where you can track the expenses based on month , year and category</li>


      </div>
      <div id="nav-bar" className={`${navBarDisplay} flex-col  items-center justify-center min-h-72]`}>
        <div id="logo-app-name-holder" className='flex flex-col'>
          <div className='flex items-center'>
            <img width="75" height="75" src="https://img.icons8.com/material-rounded/48/cost.png" alt="cost" className='bg-white rounded-md' />
            <div id="hero" className='ml-3'>
              <h1 className=' text-3xl sm:text-4xl sm:font-semibold'>Expense Tracker</h1>

            </div>
          </div>
          <div id="quote" className=' mt-2 py-2 text-xl sm:text-3xl text-center'>You Spend, You Track</div>
        </div>
        <div id="signup-login-helper" className='flex mt-5 sm:text-3xl sm:font-medium'>
          <div className='mr-1'>Already have an Account ?</div>
          <div id="signup-holder" className='mr-1'><Link className='underline mr-1 text-blue-500' to={'/auth/login'}>Login</Link><b>:</b></div>
          <div id="login-helper"><Link className='underline text-blue-500' to={'/auth/signup'}>SignUp</Link></div>
        </div>


      </div>

      <div id='email-container' className='absolute bottom-7   '>
        <div className='ml-2 sm:text-2xl text-center text-red-500
        '>For any queries or problems you face , please mail to : anonymoustech090@gmail.com</div>
      </div>

    </div>
  )
}

export default Root
