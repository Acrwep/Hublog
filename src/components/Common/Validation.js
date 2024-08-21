const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
const descriptionRegex = /^(?!\s*$).+/;
const emailRegex = /^[a-zA-Z0-9._-]{3,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
const mobileRegex = /^[0-9]+$/;
const domainRegex =
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2,})$/;

export const nameValidator = (name) => {
  let error = "";

  if (!name || name.length <= 0) error = " is required";
  else if (!nameRegex.test(name) || name.length < 3) error = " is not valid";

  return error;
};

export const lastNameValidator = (name) => {
  let error = "";

  if (!name || name.length <= 0) error = " is required";
  else if (!nameRegex.test(name)) error = " is not valid";

  return error;
};

export const descriptionValidator = (name) => {
  let error = "";
  const trimmedName = name.trim();

  if (!trimmedName || trimmedName.length <= 0) error = " is required";
  else if (!descriptionRegex.test(trimmedName) || trimmedName.length < 2)
    error = " must be 2 characters";

  return error;
};

export const emailValidator = (email) => {
  let error = "";

  if (!email || email.length <= 0) error = " is required";
  else if (!emailRegex.test(email)) error = " is not valid";

  return error;
};

export const selectValidator = (name) => {
  let error = "";

  if (!name || name.length <= 0) error = " is required";

  return error;
};

export const mobileValidator = (mobile) => {
  let error = "";

  if (!mobile || mobile.length <= 0) error = " is required";
  else if (!mobileRegex.test(mobile) || mobile.length < 10)
    error = " is not valid";
  return error;
};

export const breakTimeValidator = (min) => {
  let error = "";

  if (!min || min.length <= 0) error = " is required";
  else if (!mobileRegex.test(min)) error = " is not valid";
  return error;
};

export const addressValidator = (address) => {
  let error = "";

  if (!address || address.length <= 0) error = " is required";
  else if (address.length <= 2) error = " is not valid";

  return error;
};
