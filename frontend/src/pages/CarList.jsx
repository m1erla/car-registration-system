import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarByUserId } from "../api";
import Car from "../components/Car";
import { ThemeProvider, createTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
const MyCarList = () => {
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
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default MyCarList;
