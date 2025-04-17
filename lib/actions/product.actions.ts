"use server";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// get the products function
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(data);
}

// geting a single product from server/databse using unique id which is slug.
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug: slug },
  });
}
export async function getProductsByCategory(category: string) {
  const data = await prisma.product.findMany({
    where: { category: category },
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(data);
}
export async function getProductsByBrand(brand: string) {
  const data = await prisma.product.findMany({
    where: { brand: brand },
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(data);
}
