import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Modal, Space, Input } from "antd";
import Defaultcar from "../helper/default-car.jpg";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IconButton } from "@mui/material";
import ImageGallery from "react-image-gallery";
import { axiosGetImage, getCarById, addImage } from "../api";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
const CarDetail = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modelText, setModelText] = useState("Content of the model");
  navigate(0);

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
    getCarAndImage();
  }, [carId, imageCarIdStatus, imagesCarId]);

  const getCarAndImage = async () => {
    await dispatch(getCarById(carId));
    if (imageCarIdStatus === "idle") {
      dispatch(axiosGetImage(carId));
    }
  };

  const images =
    imagesCarId.length > 0
      ? imagesCarId[0].map((url) => ({ original: url.url }))
      : [{ original: Defaultcar }];

  // TODO remove, this demo shouldn't need to reset the theme.
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
                    title={"Car Information Card"}
                    style={{ width: "500px", height: "375px" }}
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
                        {carsByCarId ? carsByCarId.year : ""}
                      </div>
                      <div style={{ display: "flex" }}>
                        <h6>License Plate: </h6>{" "}
                        {carsByCarId ? carsByCarId.plate : ""}
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
                        placeholder="Enter Url"
                        name="url"
                      />
                    </Space>
                  </Modal>
                </>
              </main>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default CarDetail;
