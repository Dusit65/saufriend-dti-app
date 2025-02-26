import React from 'react'
import {Box, Typography, Avatar, TextField, Button} from '@mui/material'; //material ui
import SAUFRIEND from './../assets/saufriend.png';//Logo image
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigator = useNavigate();

  //func btLogin
  const handleLoginClick = async (e) => {
    e.preventDefault();
    // Validate UI
    if(userName.length == 0){
      alert('ป้อนชื่อผู้ใช้');
      return;
    }else if(userPassword.length == 0){
      alert('ป้อนรหัสผ่าน');
      return;
    }else{
      //send data to API and go to MyTravel.jsx("/mytravel") GET
      try {
        const response = await fetch(`http://localhost:4000/user/${userName}/${userPassword}`, { 
          method: 'GET',
        })
        if(response.status == 200){
          //get data Traveller and save in memory
          const data = await response.json()
          localStorage.setItem('user', JSON.stringify(data["data"]))
          //go to (/mytravel)
          navigator('/Myfriend')
          }else if(response.status == 404){
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
          }else{
            alert('เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
              }
      } catch (error) {
        alert('เกิดข้อผิดพลาด: ' + error)
      }
    }
  }
  return (
    <Box sx={{width: '100%', height:'100vh' ,display:'flex', alignItems: 'center'}}>
      <Box sx={{width:'60%', boxShadow: 4, mx:'auto', my:'auto' ,p:5}}>
      {/* Head text =====================================*/}
      <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 'bold'}}>
          SAU Friend DTI
        </Typography>
        {/* Logo image =====================================*/}
        <Avatar src={SAUFRIEND} alt='saufriend logo'
        sx={{width: 150, height: 150, mx: 'auto', my: 5}}></Avatar>
         {/* Login text =====================================*/}
        <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 'bold' }}>
          เข้าใช้งานระบบ
        </Typography>

        <Typography sx={{fontWeight: 'bold',mt:4, mb:1}}>
          ชื่อผู้ใช้
        </Typography>
        {/* TextField Username  =====================================*/}
        <TextField fullWidth value={userName} onChange={(e) => setUserName(e.target.value)}/>

        <Typography sx={{fontWeight: 'bold',mt:2 , mb:1}}>
          รหัสผ่าน
        </Typography>

         {/* TextField passwords  =====================================*/}
        <TextField fullWidth type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
        <Button variant='contained' onClick={handleLoginClick}fullWidth sx={{mt:2, py:2, backgroundColor: '#fa8805'}} >
            LOGIN
        </Button>

        {/* Link to Resgister Page */}
        <Link to='/register'style={{textDecoration: 'none', color: '#fa8805'}}>
        <Typography sx={{fontWeight: 'bold',mt:2 , mb:1, textAlign: 'center'}}>
          ลงทะเบียน
        </Typography>
        </Link>

      </Box>
    </Box>
  )
}

export default Login