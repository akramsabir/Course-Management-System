import { createContext, useState } from "react";

export let Auth = createContext();

const AuthContext = ({children}) => {
    const [user, setUser] = useState(()=>{
      const storedUser = localStorage.getItem('user');
       try{
        return storedUser ? JSON.parse(storedUser) : null;
       } catch{
        localStorage.removeItem('user');
        return null;
       }
        // return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    });

    let login=(loginDetails)=>{
        setUser(loginDetails);
        localStorage.setItem('user', JSON.stringify(loginDetails));
    }
    console.log(user);

    let logout = ()=>{
        setUser(null);
        localStorage.removeItem('user');
    }
  return (
    <Auth.Provider value={{login, user, logout}}>{children}</Auth.Provider>
  )
}

export default AuthContext