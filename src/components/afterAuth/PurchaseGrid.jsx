
import { useDeleteById } from '../../hooks/purchase';
import { ProfileContextAndUserPurchases } from '../../contexts';
import { useContext } from 'react';
function PurchaseGrid({Purchase,setTotalSpent}) {
    const{_id,purchasedItem,price,category,quantity,day,month,year,notes} = Purchase;
    const{userPurchaseDetails,setUserPurchaseDetails} = useContext(ProfileContextAndUserPurchases);
    const modifiedMonth = Number(month) + 1;
    const setDeleteById = useDeleteById({userPurchaseDetails,setUserPurchaseDetails,setTotalSpent,price});
  
  return (
    <div className='flex flex-col  gap-y-2 mt-4 relative shadow-md rounded-md mx-1 shadow-white'>
       <div className='flex flex-col'>
            <ul className={` mt-3 flex  items-center  justify-between shadow-md shadow-orange-400 sm:text-xl font-medium px-2 py-1`}>
              <li className='w-20 sm:w-28   break-words '>{purchasedItem}</li>
              <li className=' ml-1 sm:ml-[-20px] '>{price}</li>
              <li className=' ml-4 sm:ml-[-0px]'>{category}</li>
              <li className='w-20 break-words  text-center'>{quantity}</li>
              
            
              </ul>

              <div id="notes-on-hover-display" className=' py-2 px-3 text-xl mt-2 font-medium '>You Noted: {notes}</div>
        </div>
        <div id="purchased-date" className='pl-3 text-xl font-medium'>Purchased Date:{`${day}-0${modifiedMonth}-${year}`}</div>

       <div id='delet-btn-container' className='mb-2'>
       <div className='bg-red-600/90 px-3 py-1 w-24 rounded-md flex justify-center items-center ml-2 cursor-pointer' onClick={() =>{
            setDeleteById(_id);
       }} >delete</div>
      
       </div>
    </div>
  )
}

export default PurchaseGrid
