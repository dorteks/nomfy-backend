import { Prisma } from "@prisma/client";

export const Products: Prisma.ProductCreateInput[] = [
  {
    sku: "DELL-MS-150-3",
    description: "DELL Wireless Mouse",
    price: 2900,
    unit: 1,
    quantity: 2,
  },
];
