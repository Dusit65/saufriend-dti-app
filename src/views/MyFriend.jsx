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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import Profile from "./../assets/profile.png";
import SAUFRIEND from "./../assets/saufriend.png";
import { Link, useNavigate } from "react-router-dom";

//===========================End of Import======================================

function MyFriend() {
  const [userFullname, setUserFullname] = useState("");
  const [userImage, setUserImage] = useState("");
  const [myfriend, setMyFriend] = useState([]);
//Use Effect ========================================
  useEffect(() => {
    //take data from localstorage and show at AppBar
    //read data in memory

    const user = JSON.parse(localStorage.getItem("user"));
    //take data from variable and use with state

    setUserFullname(user.userFullname);
    setUserImage(user.userImage);

    //Get data From DB of traveller that login and show in table
    const getAllMyFriend = async () => {
      const resData = await fetch(
        `http://localhost:5000/myfriend/${user.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //Have a data
      if (resData.status == 200) {
        const data = await resData.json();
        setMyFriend(data["data"]);
      }
    };
    //Call Func
    getAllMyFriend();
  }, []);

  //Delete Click Func================================
  const handleDeleteMyFriendClick = async (myfriendId) => {
    try {
      const response = await fetch(`http://localhost:5000/myfriend/${myfriendId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        alert("ลบข้อมูลเพื่อนเรียบร้อยOwO");
        // navigator("/mytravel");
        window.location.reload();
      }
    } catch (error) {
      alert("ข้อผิดพลาดในการลบข้อมูลเพื่อน");
    }
  };
  //++++++++++++++++++++++++++++++++++++UI Segment+++++++++++++++++++++++++++++++++++++
  return (
    <>
      <Box sx={{ width: "100%" }}>
        {/* AppBar========================================================= */}
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
                    ? `http://localhost:5000/images/user/${userImage}`
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
        {/* End of AppBar================================================== */}
        <Box sx={{ width: "70%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
          <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
            เพื่อนของฉัน
          </Typography>
          {/* Display myfriend_tb=============================== */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
              {/* Table Head */}
              <TableHead>
                <TableRow sx={{ backgroundColor: "#aaaaaa" }}>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">ชื่อ-สกุล</TableCell>
                  <TableCell align="center">รูปเพื่อน</TableCell>
                  <TableCell align="center">เบอร์โทรศัพท์</TableCell>
                  <TableCell align="center">อายุ</TableCell>
                  <TableCell align="center">สาขาที่เรียน</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {myfriend.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: index % 2 === 0 ? "ffffff" : "#ffc0cb",
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.myfriendFullname}</TableCell>
                    <TableCell align="center">
                      {/* MyFriend Picture */}
                      <Avatar
                        src={
                          row.myfriendImage
                            ? `http://localhost:5000/images/myfriend/${row.myfriendImage}`
                            : SAUFRIEND
                        }
                        sx={{ width: 60, height: 60, boxShadow: 4 }}
                        variant="rounded"
                      />
                    </TableCell>
                    <TableCell align="center">{row.myfriendPhone}</TableCell>
                    <TableCell align="center">{row.myfriendAge}</TableCell>
                    <TableCell align="center">{row.myfriendMajor}</TableCell>
                    <TableCell align="center">
                      <Button
                        component={Link}
                        to={`/editmyfriend/${row.myfriendId}`}
                      >
                        แก้ไข
                      </Button>
                      <Button
                        onClick={() => handleDeleteMyFriendClick(row.myfriendId)}
                      >
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              
            </Table>
          </TableContainer>
          {/* Go to AddMyTravel============================================*/}
          <Link
            to="/addmyfriend"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <Button fullWidth variant="contained" sx={{ py: 2, my: 2 }}>
              เพิ่มเพื่อนของฉัน
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default MyFriend;
