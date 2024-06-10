import {isRouteErrorResponse, useRouteError } from "react-router-dom"
function ErrorPage() {
    const error = useRouteError();
    if(isRouteErrorResponse(error)){
      return (
        <div className="min-h-screen  bg-slate-500/40 flex  justify-center items-center px-3 sm:px-0 ">
          <h1>Oops!</h1>
          <h2>{error.status}</h2>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </div>
      );    
    }
        return (
           
          <div  className="min-h-screen bg-slate-500/40 flex  justify-center items-center px-3 sm:px-0 ">
            <div id="semi-container" className="shadow-lg shadow-white py-1 px-2 flex flex-col justify-center items-center rounded-lg">
            <h1 className="text-3xl">Oops!</h1>
            <h2 className="text-2xl">Page Not Found</h2>
            <h2 className="text-2xl text-center">{"I  will give a chance to develop this page , so that you won't encounter this error in future(just joking !!!)"}</h2>
            </div>
          </div>
        );
      
}

export default ErrorPage
