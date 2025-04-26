'use server'
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { categoryType } from "@/types";

export async function getAllCategories(): Promise<categoryType[]> {
  const data = await prisma.categories.findMany();
  return convertToPlainObject(data);
}