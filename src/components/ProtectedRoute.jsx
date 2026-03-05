import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

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
    return <div>Checking authentication...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}