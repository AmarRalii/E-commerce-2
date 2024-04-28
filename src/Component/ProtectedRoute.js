import { Navigate } from "react-router-dom";


export default function ProtectedRoute({children}){

    if(!localStorage.getItem('userToken')){
         return <Navigate to={'/login'}></Navigate>
    }
    else
    return children 
}