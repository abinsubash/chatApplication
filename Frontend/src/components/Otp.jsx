import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Otp = ()=>{
    const [otp,setOtp]=useState("")
    const otpRegex = /^\d{4}$/;
    const [otpError,setOtpError]=useState('')
    const navigate = useNavigate()
    const handlerOtp =async(e)=>{   
        e.preventDefault()
        if(!otpRegex.test(otp)){
            setOtpError("Enter Correct Otp")
            return
        }
        try{
            const tempUser =sessionStorage.getItem('tempUser');
            console.log(tempUser)
            const responce =await axios.post("http://localhost:5000/api/otpVerification",{
                otp,
                tempUser
            })
            if(!responce.data.success){
                setOtpError(responce.data.message)
            }else{
                navigate("/login")
            }
        }catch(error){
            console.log(error)
        }
    }
    return(
        <div>
            <form onSubmit={handlerOtp}>
                <label> OTP </label>
                <input type="number" 
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
                />
               {otpError&& <small style={{color:"red"}} >{otpError} </small>}
               <button type="Submit"> submit </button>
            </form>

        </div>
    )
}

export default Otp