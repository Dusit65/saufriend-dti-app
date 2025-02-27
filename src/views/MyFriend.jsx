import { React, useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import Profile from "./../assets/profile.png";
import { Link } from "react-router-dom";
function MyFriend() {
  const [userFullname, setUserFullname] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    //take data from localstorage and show at AppBar
    //read data in memory

    const user = JSON.parse(localStorage.getItem("user"));
    //take data from variable and use with state

    setUserFullname(user.userFullname);
    setUserImage(user.userImage);
  }, []);

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
        <Box sx={{ width: "70%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
          <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
            เพื่อนของฉัน
          </Typography>
          {/* Go to AddMyTravel============================================*/}
          <Link
            to="/addmyfriend"
            style={{
              color: "white",
              textDecoration: "none",
              marginLeft: "10px",
              fontWeight: "bold",
            }}
          >
            <Button fullWidth variant="contained" sx={{ py: 2 }}>
              เพิ่มเพื่อนของฉัน
            </Button>
          </Link>

        </Box>
      </Box>
    </>
  );
}

export default MyFriend;
