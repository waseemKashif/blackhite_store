 import {PrismaClient} from "@prisma/client"
 import sampleData from "./sample-data"

 async function main() {
    const prisma = new PrismaClient();
    await prisma.product.deleteMany();
    await prisma.banners.deleteMany();
    await prisma.categories.deleteMany();
    await prisma.account.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();

    await prisma.product.createMany({data:sampleData.products});
    await prisma.banners.createMany({data:sampleData.banners});
    await prisma.categories.createMany({data:sampleData.categories});
    await prisma.user.createMany({data:sampleData.users});
    console.log("seeded succesfully...")
 }

 main();