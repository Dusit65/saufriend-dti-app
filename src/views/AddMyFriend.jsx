import { React, useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  styled,
  TextField,
} from "@mui/material";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./../assets/profile.png";
import SAUFRIEND from "./../assets/saufriend.png"; //Logo image
function AddMyFriend() {
  const [userFullname, setUserFullname] = useState("");
  const [userImage, setUserImage] = useState("");

  const [myfriendImage, setMyFriendImage] = useState("");
  const [myfriendFullname, setMyFriendFullname] = useState("");
  const [myfriendPhone, setMyFriendPhone] = useState("");
  const [myfriendAge, setMyFriendAge] = useState("");
  const [myfriendMajor, setMyFriendMajor] = useState("");
  const [userId, setUserId] = useState("");

  const navigator = useNavigate();
  //useEffect ========================================
  useEffect(() => {
    //take data from localstorage and show at AppBar
    //read data in memory

    const user = JSON.parse(localStorage.getItem("user"));
    //take data from variable and use with state

    setUserFullname(user.userFullname);
    setUserImage(user.userImage);
    setUserId(user.userId);

    setMyFriendImage(user.myfriendImage);
  }, []);

  //select file func +++++++++++++++++++++++++++
  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMyFriendImage(file);
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
  //+++++++++++++++++++++++++++++++++++++++++++
  const handleAddMyFriendClick = async (e) => {
    console.log(myfriendFullname, myfriendPhone, myfriendAge, myfriendMajor);
    //Validate Register Button
    e.preventDefault();
    if (myfriendFullname.trim().length == 0) {
      alert("ป้อนชื่อ-นามสกุลด้วย");
    } else if (myfriendPhone.trim().length == 0) {
      alert("ป้อนเบอร์โทรศัพท์ด้วย");
    } else if (myfriendAge.trim().length == 0) {
      alert("ป้อนอายุด้วย");
    } else if (myfriendMajor.trim().length == 0) {
      alert("ป้อนสาขาวิชาด้วย");
    } else {
      //ส่งข้อมูลไปให้ API บันทึงลง DB แล้ว redirect ไปหน้า Login
      //Packing data
      const formData = new FormData();

      formData.append("myfriendFullname", myfriendFullname);
      formData.append("myfriendPhone", myfriendPhone);
      formData.append("myfriendAge", myfriendAge);
      formData.append("myfriendMajor", myfriendMajor);
      formData.append("userId", userId);

      if (myfriendImage) {
        formData.append("myfriendImage", myfriendImage);
      }

      //send data from formData to API (http://localhost:4000/travel) POST
      try {
        const response = await fetch("http://localhost:5000/myfriend/", {
          method: "POST",
          body: formData,
        });
        if (response.status == 201) {
          alert("เพิ่มเพื่อนสําเร็จOwO ");
          navigator("/myfriend");
          // window.location.href("/")
        } else {
          alert("เพิ่มเพื่อนไม่สำเร็จโปรดลองใหม่อีกครั้งTwT");
        }
      } catch (error) {
        alert("พบข้อผิดพลาดในเพิ่มเพื่อน+_+", error);
      }
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
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
                <Link to="/myfriend">
                  <FaceRetouchingNaturalIcon sx={{ color: "info" }} />
                </Link>
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My Friend DTI SAU
              </Typography>
              {/* Go to editprofile===============================*/}
              <Link to="/editprofile">
                <Button color="inherit">{userFullname}</Button>
              </Link>
              {/* Avatar picture */}
              <Avatar
                src={
                  userImage == ""
                    ? Profile
                    : `http://localhost:5000/images/user/${userImage}`
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
        <Box sx={{ width: "60%", boxShadow: 4, mx: "auto", my: "auto", p: 5 }}>
          {/* Head text =====================================*/}
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            SAU Friend DTI
          </Typography>

          {/* Logo image =====================================*/}
          <Avatar
            src={SAUFRIEND}
            alt="myfriend logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 5 }}
          ></Avatar>

          {/* Login text =====================================*/}
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            เข้าใช้งานระบบ
          </Typography>

          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            ชื่อ-สกุล
          </Typography>
          {/* TextField myFriendFullname  =====================================*/}
          <TextField
            fullWidth
            value={myfriendFullname}
            onChange={(e) => setMyFriendFullname(e.target.value)}
          />

          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            เบอร์โทรศัพท์
          </Typography>
          {/* TextField myfriendPhone  =====================================*/}
          <TextField
            fullWidth
            type="number"
            value={myfriendPhone}
            onChange={(e) => setMyFriendPhone(e.target.value)}
          />

          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            อายุ
          </Typography>
          {/* TextField Username  =====================================*/}
          <TextField
            fullWidth
            type="number"
            value={myfriendAge}
            onChange={(e) => setMyFriendAge(e.target.value)}
          />

          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            สาขาที่เรียน
          </Typography>
          {/* TextField passwords  =====================================*/}
          <TextField
            fullWidth
            value={myfriendMajor}
            onChange={(e) => setMyFriendMajor(e.target.value)}
          />

          {/* Profile Image =====================================*/}
          <Avatar
            src={
              myfriendImage && myfriendImage instanceof Blob
                ? URL.createObjectURL(myfriendImage)
                : SAUFRIEND
            }
            alt="SAUFRIEND logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 5 }}
          ></Avatar>

          {/* btSelectFile   =====================================*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mx: "auto" }}
              component="label"
            >
              อัปโหลดรูปภาพโปรไฟล์
              <SelectFileBt
                type="file"
                accept="image/*"
                onChange={handleSelectFileClick}
              />
            </Button>
          </Box>
          {/* Register Button   =====================================*/}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 2, backgroundColor: "#fa8805" }}
            onClick={handleAddMyFriendClick}
          >
            Save My Friend
          </Button>

          {/* Link to Login =====================================*/}
          <Link
            to="/myfriend"
            style={{ textDecoration: "none", color: "#fa8805" }}
          >
            <Typography
              sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
            >
              กลับไปหน้าหลัก
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default AddMyFriend;
