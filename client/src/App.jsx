import { useState } from 'react'
import Home from './home'
import Login from './login'
import Signup from './signup';
import CreateBlog from './createBlog';
import UpdateBlog from './updateBlog';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blogs/update/:id" element={<UpdateBlog />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
