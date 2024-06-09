import React from 'react'

function Button({onClick , label}) {
  return (
    <div>
      <button onClick={onClick} className='bg-[#0D6EFD] block w-full py-2.5 text-xl font-medium mt-5 rounded'>{label}</button>
    </div>
  )
}

export default Button
