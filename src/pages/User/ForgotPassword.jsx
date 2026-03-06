import { useState, useRef } from "react";
import { HashLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import loginImg from "../../assets/login.png";
import userIcon from "../../assets/user.png";

const BASEURL = import.meta.env.VITE_BASE_URL;

export default function UserForgotPassword() {

  const [email, setEmail] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); 
  // email → otp → reset

  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(["","","","","",""]);
  const otpInputs = useRef([]);

  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ================= SEND OTP =================

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Enter email");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(`${BASEURL}User?action=forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      setLoading(false);

      if(res.ok){
        setOtpToken(data.otpToken);
        setStep("otp");
      }else{
        alert(data.message);
      }

    } catch {
      setLoading(false);
      alert("Server error");
    }
  };

  // ================= OTP INPUT =================

  const handleOtpChange = (value, index) => {

    if(!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if(value && index < 5){
      otpInputs.current[index+1].focus();
    }
  };

  // ================= VERIFY OTP =================

  const verifyOtp = async () => {

    const otpValue = otp.join("");

    if(otpValue.length !== 6){
      alert("Enter full OTP");
      return;
    }

    try{

      setLoading(true);

      const res = await fetch(`${BASEURL}User?action=verify-forgot-otp`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email,
          otp: otpValue,
          otpToken
        })
      });

      const data = await res.json();

      setLoading(false);

      if(res.ok){
        setStep("reset");
      }else{
        alert(data.message);
      }

    }catch{
      setLoading(false);
      alert("Server error");
    }

  };

  // ================= RESET PASSWORD =================

  const resetPassword = async () => {

    if(!newPassword.trim()){
      alert("Enter new password");
      return;
    }

    try{

      setLoading(true);

      const res = await fetch(`${BASEURL}User?action=reset-password`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email,
          newPassword,
          otpToken
        })
      });

      const data = await res.json();

      setLoading(false);

      if(res.ok){
        alert("Password reset successful");
        navigate("/user/login", { replace: true });
      }else{
        alert(data.message);
      }

    }catch{
      setLoading(false);
      alert("Server error");
    }

  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <HashLoader color="#22c55e" size={60}/>
        </div>
      )}

      <Navbar/>

      <section className="min-h-screen bg-slate-950 text-white flex items-center py-20">

        <div className="max-w-5xl mx-auto px-4 w-full">

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Image */}

            <div className="hidden md:block">
              <img src={loginImg} alt="forgot" className="max-w-md"/>
            </div>

            {/* Card */}

            <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 shadow-xl">

              <div className="flex justify-center mb-6">
                <img src={userIcon} width="60"/>
              </div>

              <h2 className="text-3xl font-bold text-center mb-6">
                Forgot Password
              </h2>

              {/* STEP 1 EMAIL */}

              {step === "email" && (

                <form onSubmit={sendOtp} className="flex flex-col gap-4">

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none"
                  />

                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold cursor-pointer"
                  >
                    Send OTP
                  </button>

                </form>

              )}

              {/* STEP 2 OTP */}

              {step === "otp" && (

                <div className="flex flex-col items-center gap-6">

                  <p className="text-slate-400">
                    Enter OTP sent to <b>{email}</b>
                  </p>

                  <div className="flex gap-3">

                    {otp.map((digit,index)=>(
                      <input
                        key={index}
                        ref={(el)=>otpInputs.current[index]=el}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e)=>handleOtpChange(e.target.value,index)}
                        className="w-12 h-12 text-center text-xl bg-slate-900 border border-slate-700 rounded-lg focus:border-green-500 outline-none"
                      />
                    ))}

                  </div>

                  <button
                    onClick={verifyOtp}
                    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold cursor-pointer"
                  >
                    Verify OTP
                  </button>

                </div>

              )}

              {/* STEP 3 RESET PASSWORD */}

              {step === "reset" && (

                <div className="flex flex-col gap-4">

                  <div className="relative">

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e)=>setNewPassword(e.target.value)}
                      className="p-3 w-full rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none pr-10"
                    />

                    <button
                      type="button"
                      onClick={()=>setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>

                  </div>

                  <button
                    onClick={resetPassword}
                    className="bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold cursor-pointer"
                  >
                    Reset Password
                  </button>

                </div>

              )}

              <p className="text-center text-slate-400 mt-6">
                Back to{" "}
                <Link to="/user/login" className="text-green-400 cursor-pointer">
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>

      </section>

      <Footer/>
    </>
  );
}