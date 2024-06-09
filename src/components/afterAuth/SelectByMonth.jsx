

function SelectByMonth({Month,setMonth,setTotalSpent}) {
  return (
    <div id='label-select-container' className='flex flex-col gap-y-1 mt-3'>
      <label htmlFor="month-select" className='sm:text-2xl  sm:font-medium'>Choose Month<i className='text-red-700 text-base font-bold'>*</i></label>
       <select  id="month-select" value={Month} className='border border-white text-black py-2 text-base rounded' onChange={(e) =>{
            setTotalSpent(0);
             setMonth(e.target.value);
       }}>
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">Agust</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
       </select>
    </div>
  )
}

export default SelectByMonth
