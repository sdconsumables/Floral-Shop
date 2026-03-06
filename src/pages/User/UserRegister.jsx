// // import { useState, useEffect } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { HashLoader } from "react-spinners";
// // import { Eye, EyeOff } from "lucide-react";


// // import Navbar from "../../components/Navbar";
// // import Footer from "../../components/Footer";

// // import loginImg from "../../assets/login.png";
// // import userIcon from "../../assets/user.png";

// // const BASEURL = import.meta.env.VITE_BASE_URL;

// // export default function UserRegister() {

// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const [showPassword, setShowPassword] = useState(false);

// //   const [loading, setLoading] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     function handleScroll() {
// //       setScrolled(window.scrollY > 50);
// //     }

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!username.trim() || !email.trim() || !password.trim()) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const res = await fetch(`${BASEURL}User?action=register`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json"
// //         },
// //         credentials: "include",
// //         body: JSON.stringify({ username, email, password })
// //       });

// //       const data = await res.json();

// //       setLoading(false);

// //       if (res.ok) {
// //         alert("Account created successfully");
// //         navigate("/user/login", { replace: true });
// //       } else {
// //         alert(data.message || "Registration Failed");
// //       }

// //     } catch (error) {
// //       setLoading(false);
// //       console.error("Register error:", error);
// //       alert("Server error");
// //     }
// //   };

// //   return (
// //     <>
// //       {loading && (
// //         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
// //           <HashLoader color="#22c55e" size={60} />
// //         </div>
// //       )}

// //       <Navbar scrolled={scrolled} />

// //       <section className="min-h-screen bg-slate-950 text-white flex items-center py-20">
// //         <div className="max-w-5xl mx-auto px-4 w-full">

// //           <div className="flex flex-col md:flex-row items-center justify-between gap-12">

// //             {/* Image */}
// //             <div className="hidden md:block">
// //               <img src={loginImg} alt="register" className="max-w-md" />
// //             </div>

// //             {/* Register Card */}
// //             <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 shadow-xl">

// //               <div className="flex justify-center mb-6">
// //                 <img src={userIcon} alt="user" width="60" />
// //               </div>

// //               <h2 className="text-3xl font-bold text-center mb-6">
// //                 Create Account
// //               </h2>

// //               <form onSubmit={handleSubmit} className="flex flex-col gap-4">

// //                 {/* Username */}
// //                 <input
// //                   type="text"
// //                   placeholder="Username"
// //                   required
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                   className="p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none cursor-text"
// //                 />

// //                 {/* Email */}
// //                 <input
// //                   type="email"
// //                   placeholder="Email"
// //                   required
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none cursor-text"
// //                 />

// //                 {/* Password */}
// //                 <div className="relative">

// //                   <input
// //                     type={showPassword ? "text" : "password"}
// //                     placeholder="Password"
// //                     required
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     className="p-3 w-full rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none pr-10 cursor-text"
// //                   />

// //                   <button
// //                     type="button"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                     className="absolute right-3 top-3 text-white cursor-pointer"
// //                   >
// //                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// //                   </button>

// //                 </div>

// //                 {/* Submit Button */}
// //                 <button
// //                   type="submit"
// //                   disabled={loading}
// //                   className="mt-3 bg-green-500 hover:bg-green-600 transition py-3 rounded-lg font-semibold cursor-pointer"
// //                 >
// //                   {loading ? "Creating..." : "Create Account"}
// //                 </button>

// //               </form>

// //               <p className="text-center text-slate-400 mt-6">
// //                 Already have an account?{" "}
// //                 <Link
// //                   to="/user/login"
// //                   className="text-green-400 hover:text-green-300 cursor-pointer"
// //                 >
// //                   Login
// //                 </Link>
// //               </p>

// //             </div>

// //           </div>

// //         </div>
// //       </section>

// //       <Footer />
// //     </>
// //   );
// // }


// import { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { HashLoader } from "react-spinners";
// import { Eye, EyeOff } from "lucide-react";

// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// import loginImg from "../../assets/login.png";
// import userIcon from "../../assets/user.png";

// const BASEURL = import.meta.env.VITE_BASE_URL;

// export default function UserRegister() {

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [otpToken, setOtpToken] = useState("");

//   const [showPassword, setShowPassword] = useState(false);

//   const [otp, setOtp] = useState(["","","","","",""]);
//   const inputs = useRef([]);

//   const [step, setStep] = useState("form");

//   const [loading, setLoading] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     function handleScroll() {
//       setScrolled(window.scrollY > 50);
//     }

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // ================= SEND OTP =================
//   const handleSendOtp = async (e) => {
//     e.preventDefault();

//     if (!username.trim() || !email.trim() || !password.trim()) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(`${BASEURL}User?action=send-register-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email })
//       });

//       const data = await res.json();

//       setLoading(false);

//       if (res.ok) {
//         alert("OTP sent to your email");
//         setStep("otp");
//       } else {
//         alert(data.message || "Failed to send OTP");
//       }

//     } catch (error) {
//       setLoading(false);
//       alert("Server error");
//     }
//   };

//   // ================= OTP INPUT =================
//   const handleOtpChange = (value, index) => {

//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputs.current[index + 1].focus();
//     }
//   };

//   // ================= VERIFY OTP =================
//   const handleVerifyOtp = async () => {

//     const otpValue = otp.join("");

//     if (otpValue.length !== 6) {
//       alert("Enter valid OTP");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(`${BASEURL}User?action=verify-register-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           otp: otpValue
//         })
//       });

//       const data = await res.json();

//       setLoading(false);

//       if (res.ok) {
//         alert("Account created successfully");
//         navigate("/user/login", { replace: true });
//       } else {
//         alert(data.message || "Invalid OTP");
//       }

//     } catch {
//       setLoading(false);
//       alert("Server error");
//     }
//   };

//   return (
//     <>
//       {loading && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <HashLoader color="#22c55e" size={60} />
//         </div>
//       )}

//       <Navbar scrolled={scrolled} />

//       <section className="min-h-screen bg-slate-950 text-white flex items-center py-20">
//         <div className="max-w-5xl mx-auto px-4 w-full">

//           <div className="flex flex-col md:flex-row items-center justify-between gap-12">

//             {/* Image */}
//             <div className="hidden md:block">
//               <img src={loginImg} alt="register" className="max-w-md" />
//             </div>

//             {/* Card */}
//             <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 shadow-xl">

//               <div className="flex justify-center mb-6">
//                 <img src={userIcon} alt="user" width="60" />
//               </div>

//               <h2 className="text-3xl font-bold text-center mb-6">
//                 Create Account
//               </h2>

//               {/* ================= FORM ================= */}
//               {step === "form" && (

//                 <form onSubmit={handleSendOtp} className="flex flex-col gap-4">

//                   <input
//                     type="text"
//                     placeholder="Username"
//                     required
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     className="p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none"
//                   />

//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none"
//                   />

//                   <div className="relative">

//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Password"
//                       required
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="p-3 w-full rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none pr-10"
//                     />

//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-3 text-white cursor-pointer"
//                     >
//                       {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
//                     </button>

//                   </div>

//                   <button
//                     type="submit"
//                     className="mt-3 bg-green-500 hover:bg-green-600 transition py-3 rounded-lg font-semibold cursor-pointer"
//                   >
//                     Send OTP
//                   </button>

//                 </form>
//               )}

//               {/* ================= OTP UI ================= */}
//               {step === "otp" && (

//                 <div className="flex flex-col items-center gap-6">

//                   <p className="text-slate-400 text-center">
//                     Enter the OTP sent to <br/>
//                     <span className="text-white">{email}</span>
//                   </p>

//                   <div className="flex gap-3">

//                     {otp.map((digit, index) => (
//                       <input
//                         key={index}
//                         ref={(el) => inputs.current[index] = el}
//                         value={digit}
//                         onChange={(e) => handleOtpChange(e.target.value, index)}
//                         maxLength="1"
//                         className="w-12 h-12 text-center text-xl rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none"
//                       />
//                     ))}

//                   </div>

//                   <button
//                     onClick={handleVerifyOtp}
//                     className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-lg font-semibold cursor-pointer"
//                   >
//                     Verify & Create Account
//                   </button>

//                 </div>
//               )}

//               <p className="text-center text-slate-400 mt-6">
//                 Already have an account?{" "}
//                 <Link
//                   to="/user/login"
//                   className="text-green-400 hover:text-green-300 cursor-pointer"
//                 >
//                   Login
//                 </Link>
//               </p>

//             </div>

//           </div>

//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import loginImg from "../../assets/register.png";
import userIcon from "../../assets/user.png";

const BASEURL = import.meta.env.VITE_BASE_URL;

export default function UserRegister() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [step, setStep] = useState("form"); // form | otp

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef([]);

  const [otpToken, setOtpToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ================= SEND OTP =================

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASEURL}User?action=send-register-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      setLoading(false);

      if (res.ok) {
        setOtpToken(data.otpToken);
        setStep("otp");
      } else {
        alert(data.message);
      }

    } catch (error) {
      setLoading(false);
      alert("Server error");
    }
  };

  // ================= OTP INPUT =================

  const handleOtpChange = (value, index) => {

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  // ================= VERIFY OTP =================

  const verifyOtp = async () => {

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      alert("Enter full OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASEURL}User?action=verify-register-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
          otp: otpValue,
          otpToken
        })
      });

      const data = await res.json();

      setLoading(false);

      if (res.ok) {
        alert("Account created successfully");
        navigate("/user/login");
      } else {
        alert(data.message);
      }

    } catch {
      setLoading(false);
      alert("Server error");
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <HashLoader color="#22c55e" size={60} />
        </div>
      )}

      <Navbar scrolled={scrolled} />

      <section className="min-h-screen bg-slate-950 text-white flex items-center py-20">
        <div className="max-w-5xl mx-auto px-4 w-full">

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">

            {/* Image */}
            <div className="hidden md:block">
              <img src={loginImg} alt="register" className="max-w-md" />
            </div>

            {/* Card */}
            <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-lg border border-slate-800 rounded-2xl p-8 shadow-xl">

              <div className="flex justify-center mb-6">
                <img src={userIcon} alt="user" width="60" />
              </div>

              <h2 className="text-3xl font-bold text-center mb-6">
                Create Account
              </h2>

              {/* ================= FORM ================= */}

              {step === "form" && (

                <form onSubmit={sendOtp} className="flex flex-col gap-4">

                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none"
                  />

                  <div className="relative">

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="p-3 w-full rounded-lg bg-slate-900 border border-slate-700 focus:border-green-500 outline-none pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>

                  </div>

                  <button
                    type="submit"
                    className="mt-3 bg-green-500 hover:bg-green-600 py-3 rounded-lg font-semibold cursor-pointer"
                  >
                    Send OTP
                  </button>

                </form>

              )}

              {/* ================= OTP UI ================= */}

              {step === "otp" && (

                <div className="flex flex-col items-center gap-6">

                  <p className="text-slate-400 text-center">
                    Enter the OTP sent to <b>{email}</b>
                  </p>

                  <div className="flex gap-3">

                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        className="w-12 h-12 text-center text-xl bg-slate-900 border border-slate-700 rounded-lg focus:border-green-500 outline-none"
                      />
                    ))}

                  </div>

                  <button
                    onClick={verifyOtp}
                    className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold cursor-pointer"
                  >
                    Verify & Create Account
                  </button>

                </div>

              )}

              <p className="text-center text-slate-400 mt-6">
                Already have an account?{" "}
                <Link to="/user/login" className="text-green-400 cursor-pointer">
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}