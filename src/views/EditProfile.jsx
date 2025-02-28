import { React, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  styled,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import { Link, useNavigate } from "react-router-dom";
import SAUFRIEND from "./../assets/saufriend.png"; //Logo image
import Profile from "./../assets/profile.png";

function EditProfile() {
  const [userImage, setUserImage] = useState('')
  const [userFullname, setUserFullname] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const [userNewImage, setUserNewImage] = useState(null);

  const navigator = useNavigate();
  //select file func +++++++++++++++++++++++++++
  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserNewImage(file);
    }
  };

  const SelectFileBt = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  //editClick func +++++++++++++++++++++++++++
  const handleEditProfileClick = async (e) => {
    //Validate Register Button
    e.preventDefault();
    if (userFullname.trim().length == 0) {
      alert("ป้อนชื่อ-นามสกุลด้วย");
    } else if (userEmail.trim().length == 0) {
      alert("ป้อนอีเมล์ด้วย");
    } else if (userName.trim().length == 0) {
      alert("ป้อนชื่อผู้ใช้ด้วย");
    } else if (userPassword.trim().length == 0) {
      alert("ป้อนรหัสผ่านด้วย");
    } else if (userImage == null) {
      alert("เลือกรูปด้วย");
    } else {
      //Send data to API, save to DB and redirect to Login page.
      //Packing data
      const formData = new FormData();
      formData.append("userImage", userImage);
      formData.append("userFullname", userFullname);
      formData.append("userEmail", userEmail);
      formData.append("userName", userName);
      formData.append("userPassword", userPassword);
      //Send data to API
      try {
        const response = await fetch("http://localhost:4000/user/", {
          method: "POST",
          body: formData,
        });
        if (response.status == 201) {
          alert("สมัครสมาชิกสําเร็จOwO");
          navigator("/");
          // window.location.href("/")
        } else {
          alert("สมัครสมาชิกไม่สำเร็จโปรดลองใหม่อีกครั้งTwT");
        }
      } catch (error) {
        alert("พบข้อผิดพลาดในการสมัครสมาชิก", error);
      }
    }
  };
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: "orange" }}>
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <FaceRetouchingNaturalIcon sx={{ color: "info" }} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My Friend DTI SAU
              </Typography>
              {/* Go to editprofile===============================*/}
              <Link to="/editprofile">
              <Button color="primary">{userFullname}</Button>
              </Link>
              {/* Avatar picture */}
              <Avatar
              src={
                userImage
                  ? `http://localhost:4000/images/user/${userImage}`
                  : Profile
              }
            />
              <Link
                to="/"
                style={{
                  color: "red",
                  textDecoration: "none",
                  marginLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                LOG OUT
              </Link>
            </Toolbar>
          </AppBar>
          {/* AppBar====================================================== */}
        </Box>
    <Box sx={{width: '100%', height:'100vh' ,display:'flex', alignItems: 'center'}}>
      <Box sx={{width:'60%', boxShadow: 4, mx:'auto', my:'auto' ,p:5}}>
      {/* Head text =====================================*/}
      <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 'bold'}}>
          SAU Friend DTI
        </Typography>

        {/* Logo image =====================================*/}
        <Avatar src={SAUFRIEND} alt='travel logo'
        sx={{width: 150, height: 150, mx: 'auto', my: 5}}></Avatar>

        {/* Login text =====================================*/}
        <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 'bold' }}>
          เข้าใช้งานระบบ
        </Typography>

        <Typography sx={{fontWeight: 'bold',mt:4, mb:1}}>
          ชื่อ-สกุล
        </Typography>
        {/* TextField Fullname  =====================================*/}
        <TextField fullWidth value={userFullname} onChange={(e) => setUserFullname(e.target.value)}/>

        <Typography sx={{fontWeight: 'bold',mt:2, mb:1}}>
          อีเมล
        </Typography>
        {/* TextField Email  =====================================*/}
        <TextField fullWidth value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>

        <Typography sx={{fontWeight: 'bold',mt:2, mb:1}}>
          ชื่อผู้ใช้
        </Typography>
        {/* TextField Username  =====================================*/}
        <TextField fullWidth value={userName} onChange={(e) => setUserName(e.target.value)}/>

        <Typography sx={{fontWeight: 'bold',mt:2 , mb:1}}>
          รหัสผ่าน
        </Typography>
         {/* TextField passwords  =====================================*/}
        <TextField fullWidth type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
        
        {/* Profile Image =====================================*/}
        <Avatar src={userNewImage == null ? `http://localhost:4000/images/user/${userImage}` : URL.createObjectURL(userNewImage)} alt="profile logo"
            sx={{ width: 150, height: 150, mx: 'auto', my: 3 }} variant="rounded" />

        {/* btSelectFile   =====================================*/}
        <Box sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          <Button variant="contained" startIcon={<CloudUploadIcon />} sx={{mx:'auto'}} component="label">
          อัปโหลดรูปภาพโปรไฟล์
          <SelectFileBt type="file" accept="image/*" onChange={handleSelectFileClick}/>
          </Button>
          </Box>
        {/* Register Button   =====================================*/}
        <Button variant='contained' fullWidth sx={{mt:2, py:2, backgroundColor: '#fa8805'}}  >
            Register
        </Button>

       {/* Link to Login =====================================*/}
        <Link to='/'style={{textDecoration: 'none', color: '#fa8805'}}>
        <Typography sx={{fontWeight: 'bold',mt:2 , mb:1, textAlign: 'center'}}>
          กลับไปหน้าLogin
        </Typography>
        </Link>

      </Box>
    </Box>
    </>
  );
}

export default EditProfile;
