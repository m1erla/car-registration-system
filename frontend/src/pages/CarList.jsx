import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarByUserId } from "../api";
import Car from "../components/Car";
import { ThemeProvider, createTheme } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Home } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import { HiOutlineLogout } from "react-icons/hi";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
export function MyCarList() {
  const dispatch = useDispatch();
  const myCars = useSelector((state) => state.cars.carsByUserId);
  const myCarsStatus = useSelector((state) => state.cars.carsByUserIdStatus);

  useEffect(() => {
    if (myCarsStatus === "idle") {
      getCars();
    }
  }, [myCars, myCarsStatus]);

  const getCars = async () => {
    await dispatch(
      getCarByUserId(parseInt(localStorage.getItem("currentUserId")))
    );
  };
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <h2>My Cars</h2>
        </div>

        {myCars.length > 0 ? (
          myCars.map((car) => {
            return <Car key={car.id} car={car} />;
          })
        ) : (
          <div style={{ fontSize: "22px" }}>
            There are no registered vehicles...
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
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

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleHome = () => {
    navigate("/");
    navigate(0);
  };

  const handleChangePassword = () => {
    navigate("/changepassword");
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

  const logout = () => {
    localStorage.clear("token");
    localStorage.clear("currentUserId");
    localStorage.clear("currentUserName");
    navigate(0);
  };
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
                  <Link onClick={handleEditCar} to="/editCar/">
                    <ListItemText primary="Edit Car" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <Link onClick={handleCarDetail} to="/carlist">
                    <ListItemText primary="Car List" />
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
                  <Link to="/signin">
                    <ListItemText primary="Login" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <AppRegistrationIcon />
                  </ListItemIcon>
                  <Link to="/register">
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
              <Grid item xs={12}>
                <MyCarList />
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}></Grid>
              {/* Recent Orders */}
              <Grid item xs={12}></Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
