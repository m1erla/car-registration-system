import React from "react";
import { Formik, Field, useFormik, Form } from "formik";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Box, Button } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { axiosRegister } from "../../api";
import { validationRegister } from "../../components/validation/Validation";
import { Input, Space } from "antd";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { MdOutlineHome, MdOutlineFolderCopy } from "react-icons/md";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Home } from "@mui/icons-material";
import { HiOutlineLogout } from "react-icons/hi";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
export function Register() {
  const registerInfo = useSelector((state) => state.user.registerUser);

  useEffect(() => {}, [registerInfo]);
  console.log(registerInfo);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationRegister,

    onSubmit: async (values, bag) => {
      await dispatch(
        axiosRegister({
          userName: values.userName,
          password: values.password,
        })
      );

      formik.values.userName = "";
      formik.values.password = "";
      formik.values.passwordConfirm = "";
    },
  });

  return (
    <>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            background: "white",
            height: "500px",
            borderRadius: "25px",
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DisabledByDefaultIcon sx={{ mb: 0, width: 250, height: 100 }} />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              textAlign="left"
              sx={{ flexGrow: 1 }}
            >
              XYZ-Cars
            </Typography>
            {registerInfo ? (
              <h4
                style={{
                  color: registerInfo.userName === null ? "red" : "green",
                }}
              >
                {registerInfo.message}
              </h4>
            ) : (
              ""
            )}
          </section>

          <section style={{ width: "650px" }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <InputLabel>
                  <strong>Username</strong>
                </InputLabel>
                <Space
                  style={{
                    width: "500px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  direction="vertical"
                >
                  <Input
                    placeholder="Username"
                    name="userName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                  />
                  {formik.errors.userName && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      {formik.errors.userName}
                    </div>
                  )}
                </Space>

                <InputLabel>
                  <strong>Password</strong>
                </InputLabel>
                <Space
                  style={{
                    width: "500px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  direction="vertical"
                >
                  <Input.Password
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                  {formik.errors.password && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      {formik.errors.password}
                    </div>
                  )}
                </Space>

                <InputLabel>
                  <strong>Password Repeat</strong>
                </InputLabel>
                <Space
                  style={{
                    width: "500px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  direction="vertical"
                >
                  <Input.Password
                    placeholder="Enter password"
                    name="passwordConfirm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                  {formik.errors.passwordConfirm && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      {formik.errors.passwordConfirm}
                    </div>
                  )}
                </Space>
              </div>

              <div style={{ width: "500px", margin: "8px" }}>
                <Button
                  onClick={formik.handleSubmit}
                  bg="blue.500"
                  variant="contained"
                  style={{
                    borderRadius: "25px",

                    padding: "10px",
                    width: "25%",
                  }}
                >
                  Register
                </Button>
              </div>
              <div style={{ marginTop: "50px" }}>
                Already Registered?{" "}
                <Link style={{ textDecoration: "none" }} to={"/signin"}>
                  Login
                </Link>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const handleChangePassword = () => {
    navigate("/change");
    navigate(0);
  };
  const handleEditCar = () => {
    navigate("/editCar/:carId");
    navigate(0);
  };
  const handleAddNewCar = () => {
    navigate("/addnewcar");
    navigate(0);
  };
  const handleCarDetail = () => {
    navigate("/carlist");
    navigate(0);
  };

  const handleHome = () => {
    navigate("/");
    navigate(0);
  };

  const handleRegister = () => {
    navigate("/register");
    navigate(0);
  };

  const handleLogin = () => {
    navigate("/signin");
    navigate(0);
  };

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const logout = () => {
    localStorage.clear("token");
    localStorage.clear("currentUserId");
    localStorage.clear("currentUserName");
    navigate(0);
  };
  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <DisabledByDefaultIcon sx={{ mb: 0 }} />
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              textAlign="left"
              sx={{ flexGrow: 1 }}
            >
              XYZ-Cars
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>

              <Link onClick={handleHome} to="/">
                <ListItemText primary="Home" />
              </Link>
            </ListItemButton>
            {localStorage.getItem("token") ? (
              <>
                <ListItemButton>
                  <ListItemIcon>
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  <Link onClick={handleChangePassword} to="/changepassword">
                    <ListItemText primary="Change Password" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <EditNoteIcon />
                  </ListItemIcon>
                  <Link onClick={handleEditCar} to="/editCar">
                    <ListItemText primary="Edit Car" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <Link onClick={handleCarDetail} to="/carlist">
                    <ListItemText primary="Car Detail" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <Link onClick={handleAddNewCar} to="/addnewcar">
                    <ListItemText primary="Add a New Car" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <IconButton onClick={() => logout()}>
                      <LogoutIcon sx={{ ml: -0.5 }} />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </>
            ) : (
              ""
            )}

            <section></section>

            {localStorage.getItem("token") ? (
              ""
            ) : (
              <>
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <Link to="/signin" onClick={handleLogin}>
                    <ListItemText primary="Login" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <AppRegistrationIcon />
                  </ListItemIcon>
                  <Link to="/register" onClick={handleRegister}>
                    <ListItemText primary="Register" />
                  </Link>
                </ListItemButton>
              </>
            )}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}></Grid>

              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}></Grid>
              {/* Recent Orders */}
              <Grid item xs={12}></Grid>
            </Grid>
          </Container>
          <Register />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
