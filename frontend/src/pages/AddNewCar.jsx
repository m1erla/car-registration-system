import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validationAddCar } from "../components/validation/Validation";
import { addCar } from "../api";
import Dashboard from "../components/Header/Dashboard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
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

export default function AddNewCar() {
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
      <Dashboard />
      <Container maxWidth="lg" sx={{ mt: -50, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ mt: -50 }}>
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
                            brand.findIndex(
                              (brand) => brand === formik.values.brand
                            )
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
          </Grid>
          <Grid item xs={12} md={4} lg={3}></Grid>

          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
