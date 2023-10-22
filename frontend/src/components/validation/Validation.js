import * as yup from "yup";

export const validationRegister = yup.object().shape({
  userName: yup
    .string()
    .min(5, "Username must be at least 5 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Your password can consist of at least 5 characters.")
    .required("Must be filled"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Must be filled"),
});

export const changePasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .min(5, "Your password can consist of at least 5 characters.")
    .required("Must be filled"),
  password: yup
    .string()
    .min(5, "Your password can consist of at least 5 characters."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Must be filled"),
});

export const validationLogin = yup.object().shape({
  userName: yup
    .string()
    .min(5, "Username must be at least 5 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Your password can consist of at least 5 characters.")
    .required("Must be filled"),
});

export const validationAddCar = yup.object().shape({
  carName: yup
    .string()
    .min(6, "Car name must be a minimum of 6 characters.")
    .required("Must be filled"),
  brand: yup.string().required("Must be filled"),
  model: yup.string(),
  modelYear: yup
    .string()
    .min(4, "Model Year must be a minimum of 4 characters")
    .max(4, "")
    .required("Must be filled"),
  licensePlate: yup
    .string()
    .min(8, "License plate must be a minimum of 8 characters")
    .required("Must be filled"),
});
