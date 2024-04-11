import { loginFormInputValidation, validateForm } from "./utils";

export const loginFields = {
  email: {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    error: "",
    value: "",
    validate: (email: string) => {
      return loginFormInputValidation(email, "");
    },
  },
  password: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    error: "",
    value: "",
    validate: (password: string) => {
      return loginFormInputValidation("", password);
    },
  },
  validate: () => {
    return validateForm(loginFields.email.value, loginFields.password.value);
  },
};

export const registerFields = {
  email: {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    error: "",
    value: "",
    validate: (email: string) => {
      return loginFormInputValidation(email, "");
    },
  },
  password: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    error: "",
    value: "",
    validate: (password: string) => {
      return loginFormInputValidation("", password);
    },
  },
  confirmPassword: {
    label: "Confirm Password",
    placeholder: "Confirm your password",
    type: "password",
    error: "",
    value: "",
    validate: (confirmPassword: string) => {
      return loginFormInputValidation("", confirmPassword);
    },
  },
  validate: () => {
    return validateForm(
      registerFields.email.value,
      registerFields.password.value
    );
  },
};

export const resetPasswordFields = {
  email: {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    error: "",
    value: "",
    validate: (email: string) => {
      return loginFormInputValidation(email, "");
    },
  },
  validate: () => {
    return validateForm(resetPasswordFields.email.value, "");
  },
};
