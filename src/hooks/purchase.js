import {useState,useEffect, } from "react";
import { useNavigate } from "react-router-dom";

export function useDebouncedYear(delay){
  const[year,setYear] = useState('');
  const[debouncedYear,setDebouncedYear] = useState('');
  useEffect(function(){
      const setDebounceYear= setTimeout(function(){
           setDebouncedYear(year);
      },delay);

      return () =>{
         clearTimeout(setDebounceYear)
      }
  },[year])
  return [year,debouncedYear,setYear];
  
}
export function usePurchases(inputs){
  const{loadProfile,setUserPurchaseDetails} = inputs
    const[whatPurchases,setwhatPurchases] = useState('all');
    const[currentSpent,setCurrentSpent] = useState(0);
    const[Month,setMonth] = useState(new Date().getMonth());
    const[year,setYear] = useState(new Date().getFullYear());
    const [isLoading, setIsLoading] = useState(true);
    const[isclickedOnPrev,setisClickedOnPrev] = useState(false);
    const[totalSpent,setTotalSpent] = useState(0);
    const[offset,setOffset] = useState(0);
    const navigate = useNavigate();
  const fetchUserPurchases = async () =>{
           try {
            const auth_token = sessionStorage.getItem("auth_token")
             const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/auth/purchases?toget=${whatPurchases}&month=${Month}&year=${year}&offset=${offset}`,{
                method:'GET',
                headers:{
                  'Authorization': auth_token
                }
             });
  
             if(response.status === 401){
                alert(response.statusText);
                sessionStorage.removeItem('auth-token');
                  navigate('/auth/login');
                  return;
             }
             const data = await response.json();
             if(data.success){
              const purchasesArray = data.data.userPurchases
        
      
                const calculatedPrice =   purchasesArray.reduce((total,purchase) => {
                  total+= purchase.price 
                  return total;
                        },0);    
              
                 if(isclickedOnPrev){
                
                     setTotalSpent((prevTotalSpent) =>(prevTotalSpent-=currentSpent));
                     setCurrentSpent(calculatedPrice);
                     setisClickedOnPrev(false);
                 }
                 else{
                 
                         
                        setTotalSpent((prevTotalSpent) =>(prevTotalSpent+=calculatedPrice));
                        setCurrentSpent(calculatedPrice); 
                    
           
                 }
              
              setUserPurchaseDetails(data.data.userPurchases);   
              
             }
             else{
              alert(data.message);
             }
           } catch (error) {
            alert('failed in connecting to server please try after some time') 
           }
           setIsLoading(false);
          
  }
    useEffect(function(){ 
       
       if(!loadProfile){
        
        fetchUserPurchases();  
       }  
       
        
    },[whatPurchases,Month,year,offset,loadProfile])
    return [isLoading,totalSpent,whatPurchases,Month,year,offset,setOffset,setTotalSpent, setMonth,setYear,setwhatPurchases,setisClickedOnPrev]
}


export function useDeleteById(inputs){
  const{userPurchaseDetails,setUserPurchaseDetails,setTotalSpent,price} = inputs
  const[deleteById,setDeleteById] = useState('');

  const handleWhenUserPurchaseDeleted = () =>{
      
       const modifiedUserPurchases = userPurchaseDetails.filter((purchase) => purchase._id !== deleteById);
       setUserPurchaseDetails(modifiedUserPurchases);
        setTotalSpent((prevTotalSpent) => (prevTotalSpent-=price));
  }

  const handleDeleteById = async () =>{
         try {
             const auth_token = sessionStorage.getItem("auth_token")
               const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/auth/delete-single-user-purchase/${deleteById}`,{
                method:'DELETE',
                headers:{
                  'Authorization': auth_token
                }
             });

               if(response.status === 401){
                alert(response.statusText);
                sessionStorage.removeItem('auth_token')
                  navigate('/auth/login');
                  return;
             }
             const  data = await response.json();
         
             if(data.success){
                         handleWhenUserPurchaseDeleted();
                        
             }
             else{
                    alert(data.message);
             }

         } catch (error) {
          alert('failed in connecting to server please try after some time') 
         }
         setDeleteById('');
  }
  useEffect(function(){
       if(deleteById){
     
          handleDeleteById();
       }
  },[deleteById]);

  return setDeleteById;
}


export function usePurchaseEntry(){
 const navigate = useNavigate();
  const[isreadyToFetch,setisreadyToFetch] = useState(false);
  const[postPurchaseDetails,setPostPurchaseDetails]  = useState({
       purchasedItem:'',
       quantity:'',
       price:0,
       category:'footwear',
       dateOfPurchase:'2024-05-25',
       notes:''
  })
  const handleNewPurchase = async () =>{
     try {
              const auth_token = sessionStorage.getItem("auth_token");
          
              const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/auth/purchasedItem`,{
                method:'POST',
                body:JSON.stringify(postPurchaseDetails),
                headers:{
                  'Authorization': auth_token,
                  'Content-Type':'application/json'
                }
            });
           
            if(response.status === 401){
              alert(response.statusText);
              sessionStorage.removeItem('auth_token')
                navigate('/auth/login');
                return;
          }
          const  data = await response.json();
          if(data.success){
                 alert(data.data.message);
          }
          else{
                alert(data.message);
          }

     } 
     catch (error) {
     
      alert('failed in connecting to server please try after some time') 
     }

     setPostPurchaseDetails((postPurchaseDetails) =>({...postPurchaseDetails,
     purchasedItem:'',
     quantity:'',
     price:0,
     category:'footwear',
     dateOfPurchase:'2024-05-25',
     notes:''
    }));
     setisreadyToFetch(false);
  }

  useEffect(function(){
    if(isreadyToFetch){
      handleNewPurchase();
    }
  },[isreadyToFetch]);

  return [setisreadyToFetch,postPurchaseDetails,setPostPurchaseDetails]
}


export function useAnalytics(inputs){
  const{debouncedYear,setYear} = inputs;
  const options ={
    chart: {
      id: 'expense-month-wise-in-a-year'
    },
    xaxis: {
      categories: ['January','Febrauary','March','April','May','June','July','August','September','October','November','December']
    }
  };
  const[series,setSeries] = useState([{
    name: 'expenses',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }]); 
 
 
 
  const fetchExpensesInYearHandler = async () =>{
     try {                
              const auth_token = sessionStorage.getItem("auth_token");
                  
              const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/auth/year-expenses?year=${debouncedYear}`,{
                method:'GET',
                headers:{
                  'Authorization': auth_token ? auth_token : '',
                  
                }
            });

            if(response.status === 401){
              alert(response.statusText);
                sessionStorage.removeItem('auth_token')
                navigate('/auth/login');
                return;
          }
          const json = await response.json();
            if(json.success){
                 const modifiedExpensesAnalytics = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                     if(json.data.YearExpenses.length > 0){
                          json.data.YearExpenses.map((item) =>{
                                      modifiedExpensesAnalytics[item._id] = item.expenses;
                          });
                     
                          
                     }
                     else{
                        alert('no data found')
                     }
                     setSeries([{...series[0], data: modifiedExpensesAnalytics}]);
            }
            else{
             
                  alert(json.message);
            }


     } 
     catch (error) {
      alert('failed in connecting to server please try after some time') 
     }
    
  }
 

  useEffect(function(){
    if(debouncedYear.length > 3){
      fetchExpensesInYearHandler();
    }
},[debouncedYear])
  
  return[options,series]

}

export function useDeleteAllPurchases(inputs){
  const{setTotalSpent,setUserPurchaseDetails} = inputs
  const[deletePurchases,setDeletePurchases] = useState(false);
  const navigate = useNavigate();
  const handleDeletePurchases = async () =>{
    try {
      const auth_token = sessionStorage.getItem("auth_token");
      const response = await fetch(`${import.meta.env.VITE_HOST}/api/v1/user/auth/delete-all-user-purchases`,{
        method:'DELETE',
        headers:{
          'Authorization': auth_token
        }
      });
      if(response.status === 401){
        alert(response.statusText);
         sessionStorage.removeItem('auth_token')
            navigate('/auth/login');
      }
      const data = await response.json();
      if(data.success){
         alert(data.data?.message);
         setUserPurchaseDetails([]);
         setTotalSpent(0);
      }
      else{
         alert(data.message);
      }
    } catch (error) {
      alert('failed in connecting to server please try after some time') 
    }
    setDeletePurchases(false);
  }
  useEffect(function(){
         if(deletePurchases){
              handleDeletePurchases();
         }
  },[deletePurchases])
  return setDeletePurchases;
}