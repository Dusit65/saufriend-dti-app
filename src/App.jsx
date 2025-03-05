//App.jsx ใช้ในการกำหนดเส้นทาง(Route)
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import MyFriend from './views/MyFriend'
import EditProfile from './views/EditProfile'
import EditMyFriend from './views/EditMyFriend'
import AddMyFriend from './views/AddMyFriend'
import { CssBaseline } from '@mui/material'

function App() {
  return (
    <>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myfriend" element={<MyFriend />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/editmyfriend/:myfriendId" element={<EditMyFriend />} />
        <Route path="/addmyfriend" element={<AddMyFriend />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App