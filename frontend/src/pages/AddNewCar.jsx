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
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validationAddCar } from "../components/validation/Validation";
import { addCar } from "../api";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

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

const AddNewCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      carName: "",
      plate: "",
      brand: "",
      model: "",
      year: "",
    },
    validationSchema: validationAddCar,
    onSubmit: async (values, bag) => {
      dispatch(
        addCar({
          carName: values.carName,
          model: values.model,
          year: values.year,
          brand: values.brand,
          plate: values.plate,
          userId: localStorage.getItem("currentUserId"),
        })
      );
      navigate("/");
    },
  });
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          marginLeft: "239px",
          height: "100vh",
          marginTop: "-325px",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margintop: "10px",
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
                        name="plate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.plate}
                      />
                      {formik.errors.plate && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "12px",
                            textAlign: "center",
                          }}
                        >
                          {formik.errors.plate}
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
                          return (
                            <MenuItem key={key} value={brand}>
                              {brand}
                            </MenuItem>
                          );
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
                              brand.findIndex(
                                (brand) => brand === formik.values.brand
                              )
                            ].map((model, key) => {
                              return (
                                <MenuItem key={key} value={model}>
                                  {model}
                                </MenuItem>
                              );
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
                        name="year"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.year}
                      />
                      {formik.errors.year && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "12px",
                            textAlign: "center",
                          }}
                        >
                          {formik.errors.year}
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default AddNewCar;
