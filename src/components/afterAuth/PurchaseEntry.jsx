
import Input from '../utils/Input'
import Button from '../utils/Button'
import { usePurchaseEntry } from '../../hooks/purchase'
import Category from '../utils/Category';

function PurchaseEntry() {
  const[setisreadyToFetch,postPurchaseDetails,setPostPurchaseDetails] = usePurchaseEntry();
  return (
    <div id='purchases-analytics-info-holder' className='flex justify-center items-center  '>
       <div id="purchase-entry-holder" className='  min-w-[375px] w-[450px] px-2 pt-2'>

          <Input id={'purchase'} label={'Expense'} value={postPurchaseDetails.purchasedItem} inputType={'text'} placeholder={'Nike shoe'} reminder={'*'} title={'please fill this field'} onchange={function(e){
             setPostPurchaseDetails((postPurchaseDetails) =>({...postPurchaseDetails,purchasedItem:e.target.value}))
          }} passwordType={''} setPasswordType={''}/>

          <Input id={'quanity'} label={'Quantity'} value={postPurchaseDetails.quantity} inputType={'text'} placeholder={'ex: 5'} reminder={'*'} title={'please fill this field'} onchange={function(e){
             setPostPurchaseDetails((postPurchaseDetails) =>({...postPurchaseDetails,quantity:e.target.value}))
          }} passwordType={''} setPasswordType={''}/>

          <Category inputValue={postPurchaseDetails.category} onChange={function(e){
                  setPostPurchaseDetails((postPurchaseDetails) =>({...postPurchaseDetails,category:e.target.value}))
            }} includeAll={false}/>

          <Input id={'cost'} label={'Enter the amount'} value={String(postPurchaseDetails.price)} inputType={'text'} placeholder={'ex:4500'}  reminder={'*'} title={'please fill this field'} onchange={function(e){
          
             setPostPurchaseDetails((postPurchaseDetails) =>({...postPurchaseDetails,price:Number(e.target.value)}))
          }} passwordType={''} setPasswordType={''}/>

           <div id="date-container" className='mt-3'>
              <label htmlFor="date-of-purchase" className='block sm:text-2xl  sm:font-medium mb-1'>
               Date of Purchase
              </label>
              <input type="date" className='block w-full  h-10  pl-2  rounded text-l text-black  border border-black' name="date" id="date-of-purchase" value={postPurchaseDetails.dateOfPurchase} min="2001-01-01" max={`${new Date().getFullYear()}-12-31`} onChange={(e) =>{  
                       setPostPurchaseDetails((postPurchaseDetails) =>({...postPurchaseDetails,dateOfPurchase:e.target.value}))
              }}/>
            </div> 

          <div id="notes" className='mt-3 flex flex-col gap-y-1'>
            <label htmlFor='notes' className='sm:text-2xl  sm:font-medium'>{"Want to note something about purchase(optional)"}</label>
            <textarea name="notes" id="notes" cols="40" rows="5" placeholder='I bought this shoe from nike store GVK Mall ' value={postPurchaseDetails.notes} className=' border border-black pl-2 pt-2 text-base text-red-400' onChange={(e) =>{
                setPostPurchaseDetails((postPurchaseDetails) =>({...postPurchaseDetails,notes:e.target.value}))
            }}></textarea>
          </div>

          <Button onClick={() =>{
             
             setisreadyToFetch(true);
           }} label={'Submit'}/>
           
            <Button onClick={() =>{
                setPostPurchaseDetails((postPurchaseDetails) =>({...postPurchaseDetails,
                  purchasedItem:'',
                  quantity:'',
                  price:0,
                  category:'footwear',
                  notes:''}))
            }} label={'Cancel'} />
            
          
       </div>
    </div>
  )
}

export default PurchaseEntry
