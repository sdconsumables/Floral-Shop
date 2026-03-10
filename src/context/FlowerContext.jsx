// import { createContext, useContext, useEffect, useState } from "react";

// const FlowerContext = createContext();

// const BASEURL = import.meta.env.VITE_BASE_URL;

// const CACHE_KEY = "flowers_cache";
// const CACHE_TIME = 60 * 60 * 1000; // 1 hour

// export function FlowerProvider({ children }) {

//   const [flowers, setFlowers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchFlowers = async () => {

//     try {

//       const cachedData = localStorage.getItem(CACHE_KEY);

//       if (cachedData) {

//         const parsed = JSON.parse(cachedData);
//         const isExpired = Date.now() - parsed.timestamp > CACHE_TIME;

//         if (!isExpired) {
//           setFlowers(parsed.data);
//           setLoading(false);
//           return;
//         }

//       }

//       const res = await fetch(`${BASEURL}Flowers`);
//       const data = await res.json();

//       console.log("Fetched flowers:", data);

//       setFlowers(data);

//       localStorage.setItem(
//         CACHE_KEY,
//         JSON.stringify({
//           data,
//           timestamp: Date.now(),
//         })
//       );

//     } catch (error) {

//       console.error("Flower fetch error:", error);

//     } finally {

//       setLoading(false);

//     }

//   };

//   useEffect(() => {
//     fetchFlowers();
//   }, []);

//   return (
//     <FlowerContext.Provider value={{ flowers, loading }}>
//       {children}
//     </FlowerContext.Provider>
//   );
// }

// export const useFlowers = () => useContext(FlowerContext);

import { createContext, useContext, useEffect, useState } from "react";

const FlowerContext = createContext();

const BASEURL = import.meta.env.VITE_BASE_URL;

const CACHE_KEY = "flowers_cache";
const CACHE_TIME = 60 * 60 * 1000; // 1 hour

export function FlowerProvider({ children }) {

  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlowers = async () => {

    try {

      const cached = localStorage.getItem(CACHE_KEY);

      if (cached) {

        const parsed = JSON.parse(cached);
        const expired = Date.now() - parsed.timestamp > CACHE_TIME;

        if (!expired) {
          setFlowers(parsed.data);
          setLoading(false);
          return;
        }

      }

      const res = await fetch(`${BASEURL}Flowers`);
      const data = await res.json();

      setFlowers(data);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );

    } catch (error) {

      console.error("Flower fetch error:", error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  return (
    <FlowerContext.Provider value={{ flowers, loading }}>
      {children}
    </FlowerContext.Provider>
  );
}

export const useFlowers = () => useContext(FlowerContext);