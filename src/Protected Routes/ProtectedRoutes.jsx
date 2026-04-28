import React, { useContext } from 'react'
import { Auth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    // console.log(props);
    let {user} = useContext(Auth)
    console.log(user);
   if(! user){
    return <Navigate to='/login' replace />
   }else{
    return children;
   }
}

export default ProtectedRoutes