import { Route, Routes } from "react-router-dom";
import React from "react";
import App from "../pages/App";
import Chat from "../pages/Chat";
const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<App />}></Route>
      <Route path="/chat" element={<Chat />}></Route>
    </Routes>
  );
};
export default Routers;
