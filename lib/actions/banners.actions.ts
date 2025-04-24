'use server'
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { bannersType } from "@/types";

export async function getBanners(): Promise<bannersType[]> {
  const data = await prisma.banners.findMany();
  return convertToPlainObject(data);
}