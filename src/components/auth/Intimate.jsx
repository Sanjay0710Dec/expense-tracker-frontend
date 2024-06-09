import React from 'react'
import { Link } from 'react-router-dom'

function Intimate({IntimateContent,linkTo,label}) {
  return (
    <div id='intimate-link-holder' className=' flex justify-center sm:text-xl'>
      <div>{IntimateContent}<Link className='underline ml-1 text-[#0D6EFD]' to={linkTo}>{label}</Link></div>
    </div>
  )
}

export default Intimate
