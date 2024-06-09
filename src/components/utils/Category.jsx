

function Category({inputValue,onChange,includeAll}) {
  return (
    <div id="category-holder" className='flex flex-col gap-y-1 mt-3'>
    <label htmlFor="category-select" className='sm:text-2xl  sm:font-medium'>Choose Category</label>
    <select id='category-select' value={inputValue} className='border-2 border-white rounded py-2 text-base text-black' onChange={onChange}  >
       {includeAll ?  <option value="all">All</option> : ''}
      <option value="clothing"  >Clothing</option>
      <option value='education'>Education</option>
      <option value='footwear'>Footwear</option>
      <option value='food'>Food</option>
      <option value="health">Health</option>
      <option value="electronics">Electronics</option>
      <option value="household">Household</option>
      <option value="travel">Travel</option>
      <option value='others'>Others</option>
    </select>
  </div>
  )
}

export default Category
