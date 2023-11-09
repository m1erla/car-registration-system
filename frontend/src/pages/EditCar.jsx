import React from "react";
import { Formik } from "formik";
import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { validationAddCar } from "../components/validation/Validation";
import { axiosCarById, updateCar } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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

const EditCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carId } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["editCar"],
    queryFn: () => axiosCarById(carId),
  });

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (values, bag) => {
    console.log(values.carName);
    navigate("/");
    navigate(0);
    await dispatch(
      updateCar({
        carName: values.carName,
        brand: values.brand,
        year: values.year,
        lisencePlate: values.plate,
        model: values.model,
        id: parseInt(carId),
      })
    );
  };

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
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
          marginTop: "-175px",
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
                }}
              >
                <section
                  style={{
                    fontSize: "40px",
                    marginRight: "850px",
                    marginTop: "15px",
                  }}
                >
                  <h3 style={{ fontSize: "40px" }}>Record Editing {carId}</h3>
                </section>
                <Formik
                  initialValues={{
                    carName: data ? data.carName : "",
                    plate: data ? data.plate : "",
                    brand: data ? data.brand : "",
                    model: data ? data.model : "",
                    year: data ? data.year : "",
                  }}
                  validationSchema={validationAddCar}
                  onSubmit={handleSubmit}
                >
                  {({
                    handleSubmit,
                    handleBlur,
                    handleChange,
                    touched,
                    errors,
                    values,
                  }) => (
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
                            placeholder="Enter Car Name..."
                            style={{
                              width: "500px",
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                            name="carName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.carName}
                          />
                          {errors.carName && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "12px",
                                textAlign: "center",
                              }}
                            >
                              {errors.carName}
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
                            placeholder="Enter License Plate..."
                            style={{
                              width: "500px",
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                            name="plate"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.plate}
                          />
                          {errors.plate && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "12px",
                                textAlign: "center",
                              }}
                            >
                              {errors.plate}
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
                            placeholder="Enter Brand Name..."
                            style={{
                              width: "500px",
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                            name="brand"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.brand}
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
                          {errors.brand && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "12px",
                                textAlign: "center",
                              }}
                            >
                              {errors.brand}
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
                            placeholder="Enter Model Name"
                            style={{
                              width: "500px",
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                            name="model"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.model}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {values.brand
                              ? modelBrand[
                                  brand.findIndex(
                                    (brand) => brand === values.brand
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
                          {errors.model && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "12px",
                                textAlign: "center",
                              }}
                            >
                              {errors.model}
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
                            placeholder="Enter Model Year..."
                            style={{
                              width: "500px",
                              marginTop: "5px",
                              marginBottom: "5px",
                            }}
                            name="year"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.year}
                          />
                          {errors.year && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "12px",
                                textAlign: "center",
                              }}
                            >
                              {errors.year}
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
                            onClick={handleCancel}
                            variant="text"
                            style={{
                              marginRight: "15px",
                            }}
                          >
                            Cancel
                          </Button>

                          <Button
                            onClick={handleSubmit}
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
                  )}
                </Formik>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default EditCar;
