import Login from "./components/Login"
import Signup from "./components/Signup"
import Otp from "./components/Otp"
// import OtpProtect from "./services/otpProtected"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Chat from "./components/chat"

function App() {

  return (
    <Router>
      <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    {/* <Route element={<OtpProtect/>}> */}
    <Route path="/otp" element={<Otp/>}/>
    {/* </Route> */}
    <Route path="/communicate" element={<Chat/>}/>
      </Routes>
    </Router>
  )
}


export default App
