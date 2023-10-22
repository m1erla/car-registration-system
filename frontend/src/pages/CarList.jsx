import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarByUserId } from "../api";
import Car from "../components/Car";
import Dashboard from "../components/Sidebar";
import { ThemeProvider, createTheme } from "@mui/material";

function MyCarList() {
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

export default MyCarList;
