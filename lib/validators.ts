import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

// schema for inserting products
const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have two decimal places"
  );
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string().min(1, "Product must have at least one image")),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  regularPrice: currency,
  discountedPrice: z
    .string()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
      "Price must have two decimal places"
    )
    .optional()
    .nullable(),
});

// Schema for sign in of user

export const signInFormSchema = z.object({
  email: z.string().email("Invalid Email address"),
  password: z.string().min(6, "passowrd must be at least 6 characters"),
});

// schema for sign up for user, user registeration
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 2 characters"),
    email: z.string().email("Invalid Email address"),
    password: z.string().min(6, "passowrd must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, " confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't matches",
    path: ["confirmPassword"],
  });

// cart Item schema

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  regularPrice: currency,
  discountedPrice: z
    .string()
    .refine(
      (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
      "Price must have two decimal places"
    )
    .optional()
    .nullable(),
});
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "session cart id is required"),
  userId: z.string().optional().nullable(),
});
