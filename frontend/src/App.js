import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import "./App.css";
import Homepage from "./Components/homepage/Homepage";
import Login from "./Components/Login/Login";
import GuardedRoute from "./GaurdedRoute";

function App() {
  return (
    <NextUIProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <GuardedRoute element={<Login />} meta={{ auth: false }} />
            }
          />
          <Route
            path="/"
            element={
              <GuardedRoute element={<Homepage />} meta={{ auth: true }} />
            }
          />
          <Route path="*" element={<GuardedRoute element={<Login />} />} />
        </Routes>
      </Router>
    </NextUIProvider>
  );
}

export default App;
