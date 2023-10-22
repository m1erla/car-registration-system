import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addImage,
  axiosGetImage,
  deleteCar,
  getCarById,
  getCarByUserId,
  updateCar,
} from "../api";
import { useDispatch, useSelector } from "react-redux";
import { Image, Card, Button, Modal, Space, Input } from "antd";
import Defaultcar from "../helper/defaultcar1.jpg";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IconButton, InputLabel } from "@mui/material";
import ImageGallery from "react-image-gallery";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

function Car({ car }) {
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

export default Car;
