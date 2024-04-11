import { useState } from "react";

export const loginFormInputValidation = (email: string, password: string) => {
  let emailError = "";
  let passwordError = "";

  if (!email) {
    emailError = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    emailError = "Email address is invalid";
  }

  if (!password) {
    passwordError = "Password is required";
  } else if (password.length < 6) {
    passwordError = "Password needs to be 6 characters or more";
  }

  return { emailError, passwordError };
}

export const validateForm = (email: string, password: string) => {
  const { emailError, passwordError } = loginFormInputValidation(email, password);
  const formValid = emailError === "" && passwordError === "";
  return { emailError, passwordError, formValid };
}