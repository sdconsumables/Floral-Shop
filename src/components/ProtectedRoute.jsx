import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { HashLoader } from "react-spinners";


const BASEURL = import.meta.env.VITE_BASE_URL;

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await fetch(`${BASEURL}Admin-Dashboard`, {
          method: "GET",
          credentials: "include", 
        });

        setIsAuth(res.ok);
      } catch {
        setIsAuth(false);
      }
    };

    verifyAdmin();
  }, []);

  if (isAuth === null) {
        return (
      <>
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(6px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            color: "white",
            fontSize: "18px",
            fontWeight: "500",
            gap: "12px"
          }}
        >
          <HashLoader color="#22c55e" size={60} />
          <span>Authenticating...</span>
        </div>
      </>
    );
  }

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}