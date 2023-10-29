import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addImage, deleteCar, updateCar } from "../api";
import { ThemeProvider, createTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { Card, Modal, Space, Input } from "antd";
import Defaultcar from "../helper/default-car.jpg";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IconButton } from "@mui/material";
import ImageGallery from "react-image-gallery";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";
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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
const { confirm } = Modal;

export function Car({ car }) {
  //modal add image start
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modelText, setModelText] = useState("Content of the model");
  const [url, setUrl] = useState();

  const showModel = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModelText("The model will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(addImage({ url: url, carId: car.id }));
      navigate(0);
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  //  //model add image finish

  //Edit model start
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmLoadingEdit, setConfirmLoadingEdit] = useState(false);
  const [carName, setCarName] = useState(car?.carName);
  const [brand, setBrand] = useState(car?.brand);
  const [model, setModel] = useState(car?.model);
  const [modelYear, setModelYear] = useState(car?.modelYear);
  const [licensePlate, setLicensePlate] = useState(car?.licensePlate);

  const showModelEdit = () => {
    setOpenEdit(true);
  };
  const handleOkEdit = () => {
    setModelText("The model will be closed after two seconds");
    setConfirmLoadingEdit(true);
    setTimeout(() => {
      setOpenEdit(false);
      setConfirmLoadingEdit(false);
      dispatch(
        updateCar({
          carName: carName,
          brand: brand,
          modelYear: modelYear,
          licensePlate: licensePlate,
          model: model,
          id: car.id,
        })
      );
    }, 2000);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };
  //Edit modaFinish

  //delete confirm
  const showDeleteConfirm = () => {
    confirm({
      title: "Alert",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure delete this car ?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteCar(car.id));
        navigate(0);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const navigate = useNavigate();
  navigate(0);
  const dispatch = useDispatch();

  const images = car
    ? car.carImages && car.carImages.map((url) => ({ original: url.url }))
    : [];
  return (
    <div>
      <main
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "100px",
          border: "6px solid white",
          borderRadius: "15px",
        }}
      >
        <section style={{ width: "500px" }}>
          {images.length > 0 ? (
            <ImageGallery items={images} />
          ) : (
            <img width={"500px"} src={Defaultcar} />
          )}
          <IconButton
            onClick={showModel}
            style={{ width: "100%", marginTop: "5px" }}
          >
            <MdOutlineAddAPhoto /> Add Image
          </IconButton>
        </section>
        <section>
          <div>
            <IconButton onClick={showModelEdit}>
              <MdModeEditOutline />
            </IconButton>
            <IconButton onClick={showDeleteConfirm}>
              <MdDelete />
            </IconButton>
          </div>
          <Card title={"Car Information Card"} style={{ width: "500px" }}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              type="inner"
              title={car.carName}
            >
              <div style={{ display: "flex" }}>
                <h6>Brand: </h6> {car.brand}
              </div>
              <div style={{ display: "flex" }}>
                <h6>Model: </h6> {car.model}
              </div>
              <div style={{ display: "flex" }}>
                <h6>Model Year: </h6> {car.modelYear}
              </div>
              <div style={{ display: "flex" }}>
                <h6>License Plate: </h6> {car.licensePlate}
              </div>
            </Card>
          </Card>
        </section>
      </main>

      <>
        <Modal
          title="Add Image"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Space
            style={{
              width: "100%",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            direction="vertical"
          >
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter url..."
              name="url"
            />
          </Space>
        </Modal>
      </>

      <>
        <Modal
          title="Edit"
          open={openEdit}
          onOk={handleOkEdit}
          confirmLoading={confirmLoadingEdit}
          onCancel={handleCancelEdit}
        >
          <Space
            style={{
              width: "100%",
              marginTop: "5px",
              marginBottom: "5px",
            }}
            direction="vertical"
          >
            <Input
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="Enter Car Name"
              name="carName"
            />
            <Input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter Brand Name"
              name="brand"
            />
            <Input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Enter Model Name..."
              name="model"
            />
            <Input
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="Enter license plate..."
              name="licensePlate"
            />
            <Input
              value={modelYear}
              onChange={(e) => setModelYear(e.target.value)}
              placeholder="Enter model year..."
              name="modelYear"
            />
          </Space>
        </Modal>
      </>
    </div>
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
    navigate("/editCar");
    navigate(0);
  };
  const handleAddNewCar = () => {
    navigate("/addnewcar");
    navigate(0);
  };
  const handleCarDetail = () => {
    navigate("/cardetail");
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
                    <LayersIcon />
                  </ListItemIcon>
                  <Link onClick={handleChangePassword} to="/changepassword">
                    <ListItemText primary="Change Password" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <Link onClick={handleEditCar} to="/editCar/:carId">
                    <ListItemText primary="Edit Car" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <Link onClick={handleCarDetail} to="/cardetail/:carId">
                    <ListItemText primary="Car List" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <Link onClick={handleAddNewCar} to="/addnewcar">
                    <ListItemText primary="Add a New Car" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <IconButton onClick={() => logout()}>
                      <HiOutlineLogout />
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
                <Car />
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
