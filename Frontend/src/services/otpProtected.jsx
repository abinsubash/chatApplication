import { Navigate } from "react-router-dom"
const OtpProtect = ()=>{
    const tempUser = sessionStorage.getItem('tempUser')
    console.log(tempUser)
    if(!tempUser){
        return <Navigate to="/login" replace/>
    }
    return <Navigate to="/otp" replace/>
}

export default OtpProtect