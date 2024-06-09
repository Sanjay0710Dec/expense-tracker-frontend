

import { Link } from 'react-router-dom'
import {  useDeleteAllPurchases, usePurchases } from '../../hooks/purchase'
import  "../../index.css"
import PurchaseGrid from './PurchaseGrid';
import {v4 as uuid} from "uuid"
import { useContext } from 'react';
import { ProfileContextAndUserPurchases } from '../../contexts';
import Category from '../utils/Category';
import SelectByMonth from './SelectByMonth';
import Input from '../utils/Input';

function Purchases() {
 const {loadProfile,userPurchaseDetails,setUserPurchaseDetails} = useContext(ProfileContextAndUserPurchases);
  const[isLoading,totalSpent,whatPurchases,Month,year,offset,setOffset,setTotalSpent, setMonth,setYear,setwhatPurchases,setisClickedOnPrev] = usePurchases({loadProfile,setUserPurchaseDetails});
  const setDeletePurchases = useDeleteAllPurchases({setTotalSpent,setUserPurchaseDetails});

  return (
    <div id="purchases-analytics-info-holder" className='pt-8 pb-3 '>
      <div className='flex justify-center items-center '>
                <div id="redirect-to-purchase-entry" className=' text-white  min-w-[96%] sm:min-w-[95%] md:min-w-[85%] lg:min-w-[75%] xl:min-w-[60%] 2xl:min-w-[50%]   rounded-md bg-gradient-to-r from-[#141e30] to-[#243b55] border border-white  py-3 mx-1'><Link to={'/user/purchase-entry'} className='block w-full text-center text-xl  font-medium'>Create Purchase</Link></div>
      </div>
      <div className='mt-5 flex items-center justify-center   '>
            <div className=' min-w-[96%] sm:min-w-[95%] md:min-w-[85%] lg:min-w-[75%] xl:min-w-[60%] 2xl:min-w-[50%] border  border-white flex flex-col justify-center items-center py-1 text-xl font-semibold rounded-md'>
                    <li>Total Spent</li>
                  <li>{totalSpent}</li>
          </div>
      </div>
      <div id="flex-center" className='flex justify-center mt-7 '>
              <div id="category-delete-all" className=' min-w-[97%] sm:min-w-[95%] md:min-w-[85%] lg:min-w-[75%] xl:min-w-[60%] 2xl:min-w-[50%]  flex justify-between items-center px-3 py-2 rounded-md '>
                <div className=' mt-5'>
                  <button onClick={function(){
                            setDeletePurchases(true);
                  }} className='bg-red-500  text-white block w-full py-2.5 px-3 text-xl font-medium mt-5 rounded '>delete all</button>
                </div>
                
                <Category inputValue={whatPurchases} onChange={function(e){
                        setTotalSpent(0);   
                      setwhatPurchases(e.target.value)
                    }}  includeAll={true}/>
              </div>
             

      </div>

      <div id='flex-center-month-year-container' className='flex justify-center mt-7 '>
              <div id='month-year-container' className=' flex flex-col sm:justify-between sm:flex-row sm:items-center px-1 py-2   min-w-[97%] sm:min-w-[95%] md:min-w-[85%] lg:min-w-[75%] xl:min-w-[60%] 2xl:min-w-[50%] '>
                  <SelectByMonth  Month={Month}  setMonth={setMonth} setTotalSpent={setTotalSpent}/>
                 <Input id={'select-year'}  label={'Enter Year'} value={year} inputType={'text'} placeholder={'ex:2024'} reminder={"*"} title={'please fill this field'} onchange={(e) =>{
                     setTotalSpent(0);
                   setYear(e.target.value)
                 }} passwordType={''} setPasswordType={''}/>
              </div>
       </div>
       <div id="flex-prev-next-center" className='flex justify-center mt-3'>
              <div id="prev-next-container" className='  min-w-[96%] lg:min-w-[92%] xl:min-w-[86%] 2xl:min-w-[70%] px-2 py-1 rounded-md border border-white flex justify-between items-centermb-1'>
                <li className='cursor-pointer underline text-blue-500' onClick={() =>{
                      if(offset > 0){
                        setOffset((prevOffset) =>(prevOffset-=1));
                        setisClickedOnPrev(true)
                      }
                      else{
                         setisClickedOnPrev(false);
                      }
                  }}>{"<Prev"}</li>
                <li className='cursor-pointer underline text-blue-500' onClick={() =>(setOffset((prevOffset) =>(prevOffset+=1)))}>{"Next>"}</li>
              </div>
       </div>
      <div id="flex-center-purchases" className=' flex justify-center items-center '>
           <div id="top-leve-purchase-holder" className=' min-w-[96%] lg:min-w-[92%] xl:min-w-[86%] 2xl:min-w-[70%] mx-1 sm:mx-0 '>
                <div   className=' shadow-md mt-3 flex items-center sm:text-xl font-medium  justify-between py-3 px-2  rounded-md bg-gray-500/30 border border-white '>
                  <li>Purchased</li>
                  <li >Price</li>
                  <li >Category</li>
                  <li >Quantity</li>
                </div>
                 {isLoading ? <div id='purchases-analytics-info-holder' className='flex mt-3 justify-center'>
                  <div id="loader" className='mt-3'></div> 
                         </div>: userPurchaseDetails.length > 0 ? userPurchaseDetails.map((purchasedItem) =>{
                    return <PurchaseGrid key={uuid()} Purchase={purchasedItem} setTotalSpent={setTotalSpent} />
                }): <div className='mt-9 font-medium text-3xl flex justify-center items-baseline'>No  Expenses Found</div> }
           </div>
      </div>

    </div>
  )
}

export default Purchases
