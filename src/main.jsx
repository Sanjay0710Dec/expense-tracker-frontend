import React, {lazy,Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter ,RouterProvider} from 'react-router-dom'

import ErrorPage from './pages/ErrorPage'
import FallBackMain from './components/utils/FallBackMain'
import FallBackSub from './components/utils/FallBackSub'
import ErrorElement from './components/utils/ErrorElement'
const Root =  lazy(() => import('./pages/Root'));
const Auth =  lazy(() => import('./pages/Auth'));
const Signup = lazy(() => import('./components/auth/Signup'));
const SignIn = lazy(() => import('./components/auth/SignIn'));
const VerifyIdentity = lazy(() => import('./components/auth/VerifyIdentity'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Purchases = lazy(()=> import('./components/afterAuth/Purchases'));
const UserInfo = lazy(() => import('./components/afterAuth/UserInfo'));
const Analytics = lazy(() => import('./components/afterAuth/Analytics'));
const PurchaseEntry = lazy(() => import('./components/afterAuth/PurchaseEntry'));
const VerifyToResetPassword = lazy(() => import('./components/auth/VerifyToResetPassword'));
const VerifyOtpOfForgotPassword = lazy(() => import('./components/auth/VerifyOtpOfForgotPassword'));
const ChangePassword = lazy(() => import('./components/auth/ChangePassword'));


const router = createBrowserRouter([
  {
   element:<Suspense fallback={<FallBackMain/>}>
     <Root/>
   </Suspense>,
   path:'/',
   errorElement:<ErrorElement/>
  },
  {
     element:<Suspense fallback={<FallBackMain/>}>
     <Auth/>
   </Suspense>
    ,
     path:'/auth',
     
     children:[
      {
        element:<Suspense fallback={<FallBackMain/>}>
                  <Signup/>
          </Suspense>,
        path:'/auth/signup'
      },
      {
        element: <Suspense fallback={<FallBackMain/>}>
              <SignIn/>
          </Suspense>
      ,
        path:'/auth/login'
      },
      {
        element: <Suspense fallback={<FallBackMain/>}>
                   <VerifyIdentity/>
                </Suspense>,
       
        path:'/auth/verify-identity'
      },
      {
        element:<Suspense fallback={<FallBackMain/>}>
               <VerifyToResetPassword/>
       </Suspense>,
       
        path:'/auth/verify-email'
      },
      {
           element:<Suspense fallback={<FallBackMain/>}>
            <VerifyOtpOfForgotPassword/>
           </Suspense>,
           path:'/auth/verify-otp'
      },
      {
        element:<Suspense fallback={<FallBackMain/>}>
                   <ChangePassword/>
       </Suspense>,
     
        path:'/auth/reset-password'
      }
     ],
     errorElement:<ErrorElement/>
  },
   {
     element:<Suspense fallback={<FallBackMain/>}>
     <Dashboard/>
   </Suspense>
   ,
     path:'/user',
     children:[{
         element:<Suspense fallback={<FallBackSub/>}>
                    <Purchases/>
         </Suspense>,
         path:'/user/purchases'
     },{
       element: <Suspense fallback={<FallBackSub/>}>
             <UserInfo/>
      </Suspense>,
      
       path:'/user/info'
     },{
       element:<Suspense fallback={<FallBackSub/>}>
       <PurchaseEntry/>
       </Suspense>,
      
       path:'/user/purchase-entry'
     },
     {
      element: <Suspense fallback={<FallBackSub/>}>
                 <Analytics/>
      </Suspense>,
     
      path:'/user/analytics'
     }],
     errorElement:<ErrorElement/>
   },
  {
    element:<ErrorPage/>,
    path:'*'
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(

   <RouterProvider router={router}/>

)
