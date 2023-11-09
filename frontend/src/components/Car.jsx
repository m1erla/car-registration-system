import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addImage, deleteCar, updateCar } from "../api";
import { useDispatch } from "react-redux";
import { Card, Modal, Space, Input } from "antd";
import Defaultcar from "../helper/default-car.jpg";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import ImageGallery from "react-image-gallery";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const Car = ({ car }) => {
  //modal add image start
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modelText, setModelText] = useState("Content of the model");
  const [url, setUrl] = useState();

  const showModel = () => setOpen(true);

  const handleOk = async () => {
    setModelText("The model will be closed after two seconds");
    setConfirmLoading(true);
    try {
      await dispatch(addImage({ url, carId: car.id }));
      navigate(0);
    } finally {
      setOpen(false);
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Modal state for add image
  const [addImageModal, setAddImageModal] = useState({
    open: false,
    confirmLoading: false,
    modelText: "Content of the model",
    url: "",
  });

  // Modal state for edit car
  const [editCarModal, setEditCarModal] = useState({
    open: false,
    confirmLoading: false,
    carName: car?.carName || "",
    brand: car?.brand || "",
    model: car?.model || "",
    year: car?.year || "",
    plate: car?.plate || "",
  });

  // Function to handle navigation
  const handleNavigation = () => {
    navigate(0);
  };

  // Function to show add image modal
  const showAddImageModal = () => {
    setAddImageModal({ ...addImageModal, open: true });
  };

  // Function to handle add image modal OK
  const handleAddImageModalOk = async () => {
    setAddImageModal({
      ...addImageModal,
      modelText: "The model will be closed after two seconds",
      confirmLoading: true,
    });

    try {
      await dispatch(addImage({ url: addImageModal.url, carId: car.id }));
      handleNavigation();
    } finally {
      setAddImageModal({
        ...addImageModal,
        open: false,
        confirmLoading: false,
      });
    }
  };

  // Function to handle add image modal cancel
  const handleAddImageModalCancel = () => {
    setAddImageModal({ ...addImageModal, open: false });
  };

  // Function to show edit car modal
  const showEditCarModal = () => {
    setEditCarModal({ ...editCarModal, open: true });
  };

  // Function to handle edit car modal OK
  const handleEditCarModalOk = () => {
    setEditCarModal({
      ...editCarModal,
      modelText: "The model will be closed after two seconds",
      confirmLoading: true,
    });

    setTimeout(() => {
      setEditCarModal({ ...editCarModal, open: false, confirmLoading: false });
      dispatch(
        updateCar({
          carName: editCarModal.carName,
          brand: editCarModal.brand,
          year: editCarModal.year,
          plate: editCarModal.plate,
          model: editCarModal.model,
          id: car.id,
        })
      );
    }, 2000);
  };

  // Function to handle edit car modal cancel
  const handleEditCarModalCancel = () => {
    setEditCarModal({ ...editCarModal, open: false });
  };

  // Function to show delete confirm modal
  const showDeleteConfirm = () => {
    confirm({
      title: "Alert",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure you want to delete this car?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteCar(car.id));
        handleNavigation();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // UseEffect to handle navigation when car prop changes
  useEffect(() => {
    handleNavigation();
  }, [car]);

  const images = car?.carImages?.map((url) => ({ original: url.url })) || [];
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
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
                title={car?.carName}
              >
                <div style={{ display: "flex" }}>
                  <h6>Brand: </h6> {car?.brand}
                </div>
                <div style={{ display: "flex" }}>
                  <h6>Model: </h6> {car?.model}
                </div>
                <div style={{ display: "flex" }}>
                  <h6>Model Year: </h6> {car?.year}
                </div>
                <div style={{ display: "flex" }}>
                  <h6>License Plate: </h6> {car?.plate}
                </div>
              </Card>
            </Card>
          </section>
        </main>

        <>
          <Modal
            title="Add Image"
            open={addImageModal.open}
            onOk={handleAddImageModalOk}
            confirmLoading={addImageModal.confirmLoading}
            onCancel={handleAddImageModalCancel}
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
            open={editCarModal.open}
            onOk={handleEditCarModalOk}
            confirmLoading={editCarModal.confirmLoading}
            onCancel={handleEditCarModalCancel}
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
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                placeholder="Enter license plate..."
                name="plate"
              />
              <Input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter model year..."
                name="year"
              />
            </Space>
          </Modal>
        </>
      </div>
    </ThemeProvider>
  );
};

export default Car;
