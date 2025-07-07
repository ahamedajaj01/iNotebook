import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom'

function TitleHandler() {
    const location = useLocation()
    useEffect(()=>{
        const path = location.pathname
    if (path === "/login" || path === "/signup") {
      document.title = "iNotebook - Login/Signup";
    } else if (path === "/mynotes") {
      document.title = "iNotebook - My Notes";
    } else if (path === "/dashboard") {
      document.title = "iNotebook - Dashboard";
    } else if(path === "/about"){
        document.title = "iNotebook - About";
}else  {
      document.title = "iNotebook - Home";
    }
    }, [location])
      return null; // No UI, just side effect
}

export default TitleHandler
