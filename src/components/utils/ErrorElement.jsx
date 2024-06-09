import React from 'react'

function ErrorElement() {
  return (
    <div className='h-screen flex items-center justify-center  bg-slate-500/40 px-3 sm:px-0'>
        <div className='flex flex-col text-black text-3xl items-center py-1 px-1'>
            <h2>Something Gone Wrong,</h2>
            <h3>Please refresh the page</h3>
            <h3>Even if refreshing the page do not work, please try after sometime</h3>
        </div>
    </div>
  )
}

export default ErrorElement
