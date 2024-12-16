import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ClipLoader} from "react-spinners"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [Loading,setLoading] = useState("")
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const userNameRegex = /^[a-zA-Z0-9_]{4,16}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    console.log("email", email);
    console.log("password", password);
  
    let username = null;
    let emailToSend = null;
    let isValid = true;
  
    if (emailRegex.test(email)) {
      emailToSend = email;
      setEmailError("");
    } else if (userNameRegex.test(email)) {
      username = email;
      emailToSend = undefined;
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email or username.");
      isValid = false;
    }
  
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }
  
    if (isValid) {
      try {
        const response = await axios.post("http://localhost:5000/api/loginValidation", {
          username: username || undefined,
          email: emailToSend || undefined,
          password,
        });
  
        if (response.data.success) {
          navigate("/communicate");
        } else {
          const message = response.data.message;
          if (message === "Password is wrong") {
            setPasswordError("Password is wrong");
          } else if (message === "Username is wrong") {
            setEmailError("Username is wrong");
            username = null; 
          } else if (message === "Email is wrong") {
            setEmailError("Enter a valid email");
            emailToSend = null; 
          }
        }
      } catch (error) {
        console.error("Error during API call:", error);
      }finally {
        console.log("Finally block executed");
        setLoading(false);
      }      
    }else {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>LOGIN</h1>
      {/* Added missing closing tag for form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="string"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
          {emailError && <small style={{ color: "red" }}>{emailError}</small>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
          {passwordError && (
            <small style={{ color: "red" }}>{passwordError}</small>
          )}
        </div>
        <button type="submit" style={{ padding: "5px 10px" }} disabled={Loading}>{
          Loading?(
            <ClipLoader size={20} color={"#ffffff"}/>
          ):(
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};
export default Login;
