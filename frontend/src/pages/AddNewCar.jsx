import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validationAddCar } from "../components/validation/Validation";
import { addCar } from "../api";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Home } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
const brand = [
  "BMW",
  "Mercedes",
  "Honda",
  "Audi",
  "Toyota",
  "Volswagen",
  "Volvo",
];
const modelBrand = [
  [
    "525 X drive Sedan",
    "320 X drive Sedan",
    "X5 jeep",
    "116i hatchback",
    "M8 Coupe",
  ],

  ["S600", "E600", "maybach 4 Matic", "CLA AMG A100", "GLA jeep"],

  ["honda civic", "honda accord", "honda City", "honda HR-V", "honda CR-V"],

  [
    "Audi A1 Sportback",
    "Audi Q5",
    "Audi A7 Sportback",
    "Audi A4 Allroad",
    "Audi TTC ",
  ],

  ["Corolla", "C-HR", "RAV4", "Auris", "Yaris"],

  ["Polo", "Golf", "T-Roc", "Tiguan", "Caddy", "Transporter"],

  ["S60", "S40", "XC60", "S90", "XC90"],
];

export function AddNewCar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      carName: "",
      licensePlate: "",
      brand: "",
      model: "",
      modelYear: "",
    },
    validationSchema: validationAddCar,
    onSubmit: async (values, bag) => {
      dispatch(
        addCar({
          carName: values.carName,
          model: values.model,
          modelYear: values.modelYear,
          brand: values.brand,
          licensePlate: values.licensePlate,
          userId: localStorage.getItem("currentUserId"),
        })
      );
      navigate("/");
    },
  });
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "200px",
        }}
      >
        <section>
          <h3
            style={{
              fontSize: "40px",
              marginRight: "850px",
              marginTop: "15px",
            }}
          >
            Add a New Car
          </h3>
        </section>

        <section style={{ width: "650px" }}>
          <form
            style={{
              marginTop: "15px",
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
                <strong>Car Name</strong>
              </InputLabel>
              <Input
                placeholder="Enter Car Name"
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                name="carName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.carName}
              />
              {formik.errors.carName && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {formik.errors.carName}
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel>
                <strong>License Plate</strong>
              </InputLabel>
              <Input
                placeholder="Enter License Plate"
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                name="licensePlate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.licensePlate}
              />
              {formik.errors.licensePlate && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {formik.errors.licensePlate}
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel>
                <strong>Brand</strong>
              </InputLabel>
              <Select
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                name="brand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {brand.map((brand, key) => {
                  return <MenuItem value={brand}>{brand}</MenuItem>;
                })}
              </Select>
              {formik.errors.brand && (
                <div
                  placeholder="Select a Brand"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {formik.errors.brand}
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel>
                <strong>Model</strong>
              </InputLabel>
              <Select
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                name="model"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.model}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {formik.values.brand
                  ? modelBrand[
                      brand.findIndex((brand) => brand === formik.values.brand)
                    ].map((model) => {
                      return <MenuItem value={model}>{model}</MenuItem>;
                    })
                  : ""}
              </Select>
              {formik.errors.model && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {formik.errors.model}
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel>
                <strong>Model Year</strong>
              </InputLabel>
              <Input
                placeholder="Enter Model Year"
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                name="modelYear"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.modelYear}
              />
              {formik.errors.modelYear && (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {formik.errors.modelYear}
                </div>
              )}
            </div>

            <div
              style={{
                marginTop: "10px",
                textAlign: "end",
                width: "500px",
              }}
            >
              <Button
                onClick={() => navigate("/")}
                variant="text"
                style={{
                  marginRight: "15px",
                }}
              >
                Cancel
              </Button>

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
                Save
              </Button>
            </div>
          </form>
        </section>
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
                  <Link onClick={handleEditCar} to="/editCar">
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
                <AddNewCar />
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
