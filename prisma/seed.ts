import { User } from "./user";
import { Address } from "./address";
import { Products } from "./products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding.....`);
  for (const user of User) {
    await prisma.user.create({
      data: user,
    });
  }

  for (const address of Address) {
    await prisma.address.create({
      data: address,
    });
  }

  for (const product of Products) {
    await prisma.product.create({
      data: product,
    });
  }
  console.log(`Finsished seeding.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
