import * as React from "react";
import {
  styled,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material/styles";
import {
  getAllByBrand,
  getAllByModel,
  getAllByBrandAndModel,
  getAllCars,
} from "../../api";
import { MdFilterAlt } from "react-icons/md";
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
import { GridToolbarContainer } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FullFeaturedCrudGrid from "../DataGrid";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filteredData } from "../../redux/cars/carsSlice";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { HiOutlineLogout } from "react-icons/hi";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableCar from "../TableCar";
import { Home } from "@mui/icons-material";
import { BsFillCarFrontFill } from "react-icons/bs";
import { Modal, Space } from "antd";
import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [brandFiltered, setBrandFiltered] = React.useState("");
  const [modalFiltered, setModalFiltered] = React.useState("");
  const [confirmLoadingEdit, setConfirmLoadingEdit] = React.useState(false);

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
    navigate("/editCar/:carId");
    navigate(0);
  };
  const handleAddNewCar = () => {
    navigate("/addnewcar");
    navigate(0);
  };
  const handleCarDetail = () => {
    navigate("/cardetail/:carId");
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

  const dispatch = useDispatch();

  const handleSubmitSearch = async () => {
    if (search !== " ") {
      await dispatch(filteredData(search));
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const fetchData = () => {
    if (brandFiltered == !"" && modalFiltered !== "") {
      dispatch(
        getAllByBrandAndModel({ brand: brandFiltered, model: modalFiltered })
      );
    } else if (brandFiltered !== "") {
      dispatch(getAllByBrand(brandFiltered));
    } else if (modalFiltered !== "") {
      dispatch(getAllByModel(modalFiltered));
    }
  };

  const showModalEdit = () => {
    setOpenEdit(true);
  };
  const handleOkEdit = () => {
    setConfirmLoadingEdit(true);
    setTimeout(() => {
      fetchData();
      setOpenEdit(false);
      setConfirmLoadingEdit(false);
    }, 2000);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };
  const handleAll = async () => {
    await dispatch(getAllCars());
    setBrandFiltered("");
    setModalFiltered("");
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

            <Search role="search" onSubmit={handleSubmitSearch}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onSubmit={handleSubmitSearch}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Search>
            <IconButton onClick={showModalEdit}>
              <MdFilterAlt />
            </IconButton>
            <Button onClick={handleAll}>All</Button>
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
                    <ListItemText primary="Car Detail" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <Link
                    onClick={handleAddNewCar}
                    to="/addnewcar"
                    style={{ textDecoration: "none" }}
                  >
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

            {localStorage.getItem("token") ? (
              ""
            ) : (
              <>
                <ListItemButton>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <Link
                    to="/signin"
                    style={{ textDecoration: "none" }}
                    onClick={handleLogin}
                  >
                    <ListItemText primary="Login" />
                  </Link>
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <Link
                    to="/register"
                    style={{ textDecoration: "none" }}
                    onClick={handleRegister}
                  >
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
                <div>
                  <main>
                    <section style={{ marginLeft: "80px", marginTop: "15px" }}>
                      <h2>Araçlar</h2>
                    </section>
                    <section
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ marginLeft: "15px", marginTop: "20px" }}>
                        {" "}
                      </div>
                      <div style={{ display: "flex" }}></div>
                    </section>
                    <hr></hr>
                    <div
                      style={{
                        display: "flex",
                        width: "1100px",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <section style={{ marginLeft: "20px" }}>
                          <IconButton onClick={showModalEdit}>
                            <MdFilterAlt />
                          </IconButton>
                          <Button onClick={handleAll}>All</Button>
                        </section>

                        {localStorage.getItem("token") ? (
                          <Link
                            to={"/addnewcar"}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              color="primary"
                              startIcon={<AddIcon />}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "150px",
                                border: "1px solid",
                              }}
                            >
                              {" "}
                              Add a New Car
                            </Button>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>

                      {localStorage.getItem("token") ? (
                        <section
                          style={{
                            marginLeft: "25px",
                            marginRight: "25px",
                            width: "100px",
                          }}
                        >
                          <Link
                            to={"/cardetail"}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "150px",
                                border: "1px solid",
                                fontSize: "12px",
                              }}
                            >
                              <BsFillCarFrontFill
                                style={{ width: "25px", height: "25px" }}
                              />
                              My Car
                            </Button>
                          </Link>
                        </section>
                      ) : (
                        ""
                      )}
                    </div>

                    <section
                      style={{
                        marginTop: "10PX",
                        marginLeft: "25px",
                        marginRight: "25px",
                      }}
                    >
                      <TableCar />
                    </section>
                  </main>
                  <>
                    <Modal
                      title="Filtrele"
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
                        <section
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <InputLabel>
                              <strong>Brand</strong>
                            </InputLabel>
                            <Select
                              placeholder="Enter brand"
                              style={{
                                width: "200px",
                              }}
                              name="brand"
                              onChange={(e) => setBrandFiltered(e.target.value)}
                              value={brandFiltered}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {brand.map((brand, key) => {
                                return (
                                  <MenuItem value={brand}>{brand}</MenuItem>
                                );
                              })}
                            </Select>
                          </div>

                          <div>
                            <InputLabel>
                              <strong>Model</strong>
                            </InputLabel>
                            <Select
                              placeholder="Enter Model"
                              style={{
                                width: "200px",
                              }}
                              name="model"
                              onChange={(e) => setModalFiltered(e.target.value)}
                              value={modalFiltered}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>

                              {brandFiltered
                                ? modelBrand[
                                    brand.findIndex(
                                      (brand) => brand === brandFiltered
                                    )
                                  ].map((model, key) => {
                                    return (
                                      <MenuItem key={key} value={model}>
                                        {model}
                                      </MenuItem>
                                    );
                                  })
                                : modelBrand.map((model) => {
                                    return model.map((m, key) => {
                                      return (
                                        <MenuItem key={key} value={m}>
                                          {m}
                                        </MenuItem>
                                      );
                                    });
                                  })}
                            </Select>
                          </div>
                        </section>
                      </Space>
                    </Modal>
                  </>
                </div>
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
