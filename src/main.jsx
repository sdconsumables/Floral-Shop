// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { FlowerProvider } from "./context/FlowerContext";

// createRoot(document.getElementById('root')).render(
//   <FlowerProvider>
//     <App />
//   </FlowerProvider>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'
import { FlowerProvider } from "./context/FlowerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FlowerProvider>
      <App />
    </FlowerProvider>
  </React.StrictMode>
);


