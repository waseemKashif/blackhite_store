export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "BLACKHITE WAS";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "New tech online store with Next js 15";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http//localhost:3000";
export const LATEST_PRODUCTS_LIMIT = Number(
  process.env.LATEST_PRODUCTS_LIMIT || 6
);
export const signInDefaultValues = {
  email: "",
  password: "",
};
export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const shippingAddressDefaultValues = {
  fullName: "",
  streetAddress: "",
  phone: "",
  city: "",
  country: "",
  postalCode: "",
  isDefault: false,
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal", "Stripe", "CashOnDelivery", "CredOnDelivery"];

export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || "CardOnDelivery";
