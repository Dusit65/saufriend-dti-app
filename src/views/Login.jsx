import React from 'react'
import {Box, Typography, Avatar, TextField, Button} from '@mui/material'; //material ui
import SAUFRIEND from './../assets/saufriend.png';//Logo image
import {Link} from 'react-router-dom';

function Login() {
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
        <TextField fullWidth />

        <Typography sx={{fontWeight: 'bold',mt:2 , mb:1}}>
          รหัสผ่าน
        </Typography>

         {/* TextField passwords  =====================================*/}
        <TextField fullWidth type='password'/>
        <Button variant='contained' fullWidth sx={{mt:2, py:2, backgroundColor: '#fa8805'}} >
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