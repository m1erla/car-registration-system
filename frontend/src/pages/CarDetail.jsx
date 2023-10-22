import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Modal, Space, Input } from "antd";
import Defaultcar from "../helper/defaultcar1.jpg";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IconButton } from "@mui/material";
import ImageGallery from "react-image-gallery";
import { axiosGetImage, getCarById, addImage } from "../api";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Home } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import { HiOutlineLogout } from "react-icons/hi";
function CarDetail() {
  const [show, setShow] = React.useState(false);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modelText, setModelText] = useState("Content of the model");
  //navigate(0)

  const [url, setUrl] = useState();
  const { carId } = useParams();
  const dispatch = useDispatch();
  const carsByCarId = useSelector((state) => state.cars.carsId);
  const imagesCarId = useSelector((state) => state.image.imageId);
  const imageCarIdStatus = useSelector((state) => state.image.imageIdStatus);

  const showModel = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModelText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(addImage({ url: url, carId: carId }));
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    getOneCar();
    if (imageCarIdStatus === "idle") {
      get();
    }
  }, [carId, imageCarIdStatus, imagesCarId]);

  const getOneCar = async () => {
    await dispatch(getCarById(carId));
  };

  const get = async () => {
    await dispatch(axiosGetImage(carId));
  };

  const images =
    imagesCarId.length > 0
      ? imagesCarId[0].map((url) => ({ original: url.url }))
      : [];

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
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
    navigate(0);
  };

  const handleChangePassword = () => {
    navigate("/changepassword");
    navigate(0);
  };

  const handleEditCar = () => {
    navigate("/editcar");
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
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.clear("token");
    localStorage.clear("currentUserId");
    localStorage.clear("currentUserName");
    navigate(0);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>

          <Grid item xs={12} md={4} lg={3}>
            <main
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "100px",
              }}
            >
              <section style={{ width: "500px" }}>
                {images.length > 0 ? (
                  <ImageGallery items={images} />
                ) : (
                  <img width={"500px"} src={Defaultcar} />
                )}

                {parseInt(localStorage.getItem("currentUserId")) ===
                carsByCarId?.userId ? (
                  <IconButton
                    onClick={showModel}
                    style={{ width: "100%", marginTop: "5px" }}
                  >
                    <MdOutlineAddAPhoto /> Add Image
                  </IconButton>
                ) : (
                  ""
                )}
              </section>
              <section>
                <Card
                  title={"Car Informations Card"}
                  style={{ width: "500px" }}
                >
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    type="inner"
                    title={carsByCarId ? carsByCarId.carName : ""}
                  >
                    <div style={{ display: "flex" }}>
                      <h6>Brand: </h6> {carsByCarId ? carsByCarId.brand : ""}
                    </div>
                    <div style={{ display: "flex" }}>
                      <h6>Model: </h6> {carsByCarId ? carsByCarId.model : ""}
                    </div>
                    <div style={{ display: "flex" }}>
                      <h6>Model Year: </h6>{" "}
                      {carsByCarId ? carsByCarId.modelYear : ""}
                    </div>
                    <div style={{ display: "flex" }}>
                      <h6>License Plate: </h6>{" "}
                      {carsByCarId ? carsByCarId.licensePlate : ""}
                    </div>
                  </Card>
                </Card>
              </section>

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
                      placeholder="Url giriniz..."
                      name="url"
                    />
                  </Space>
                </Modal>
              </>
            </main>
          </Grid>

          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default CarDetail;
