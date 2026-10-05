import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Learn from "../pages/Learn"
import Playground from "../pages/Playground"
import Games from "../pages/Games"
import Challenge from "../pages/Challenge"
import Achievement from "../pages/Achievement"
import Profile from "../pages/Profile"


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route 
          path="/playground" 
          element={<Playground />} 
        />
        <Route 
          path="/games" 
          element={<Games />} 
        />
        <Route 
          path="/challenge" 
          element={<Challenge />} 
        />
        <Route 
          path="/achievement" 
          element={<Achievement />} 
        />
        <Route 
          path="/profile" 
          element={<Profile />} 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes