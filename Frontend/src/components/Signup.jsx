import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [domain, setDomain] = useState("");

    const [nameError, setNameError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const userNameRegex = /^[a-zA-Z0-9_]{4,16}$/;

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!name.trim()) {
            setNameError("Name cannot be empty.");
            isValid = false;
        } else {
            setNameError("");
        }

        if (!userNameRegex.test(userName)) {
            setUserNameError("Username must be 4-16 characters and alphanumeric.");
            isValid = false;
        } else {
            setUserNameError("");
        }

        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!passwordRegex.test(password)) {
            setPasswordError(
                "Password must be at least 6 characters long and contain at least one letter and one number."
            );
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (isValid) {
            try {
                const response = await axios.post("http://localhost:5000/api/signup", {
                    name,
                    userName,
                    email,
                    password,
                    domain,
                });
                if (!response.data.success) {
                    switch (response.data.message) {
                      case "Email already exists.":
                        setEmailError("Email already exists.");
                        setUserNameError(""); 
                        break;
              
                      case "Username already exists. Please enter another username.":
                        setUserNameError("Username already exists. Please enter another username.");
                        setEmailError("");
                        break;
              
                      default:
                        alert("An unexpected error occurred.");
                    }
                  } else {
                    console.log(response.data.token)
                    sessionStorage.setItem("tempUser", response.data.token);
                    alert(response.data.message);
                    navigate('/otp'); 
                  }
            } catch (error) {
                console.error("Error during signup:", error.response?.data || error.message);
                alert("Signup failed! Please try again.");
            }
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ padding: "5px", width: "100%" }}
                    />
                    {nameError && <small style={{ color: "red" }}>{nameError}</small>}
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        style={{ padding: "5px", width: "100%" }}
                    />
                    {userNameError && <small style={{ color: "red" }}>{userNameError}</small>}
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: "5px", width: "100%" }}
                    />
                    {emailError && <small style={{ color: "red" }}>{emailError}</small>}
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: "5px", width: "100%" }}
                    />
                    {passwordError && <small style={{ color: "red" }}>{passwordError}</small>}
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Domain</label>
                    <select
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        style={{ padding: "5px", width: "100%" }}
                    >
                        <option value="">-- Select Your Domain --</option>
                        <option value="mern">MERN</option>
                        <option value="mean">MEAN</option>
                        <option value="mevn">MEVN</option>
                        <option value="django">Django</option>
                        <option value="flutter">Flutter</option>
                        <option value="react">React</option>
                        <option value="angular">Angular</option>
                        <option value="nodejs">Node.js</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="php">PHP</option>
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
