import React from "react";
import { useActions } from "./useActions";
import { authThunks } from "../../features/auth/model/auth.slice";
import { FormikHelpers, useFormik } from "formik";
import { LoginParamsType } from "../../features/auth/api/auth.api";
import { BaseResponseType } from "../types";


type FormikErrorType = Partial<LoginParamsType>

export const useLogin = () => {
  const { login } = useActions(authThunks);
  return useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 3) {
        errors.password = "Must be 3 characters or more";
      }
      return errors;
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: ""
    },
    onSubmit: (values, formikHelpers: FormikHelpers<any>) => {
      login(values)
        .unwrap()
        .catch((reason: BaseResponseType) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    }
  });
};

