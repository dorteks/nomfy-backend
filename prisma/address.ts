import { Prisma } from "@prisma/client";

export const Address: Prisma.AddressCreateInput[] = [
  {
    country: "NGA",
    state: "Oyo",
    city: "Ibadan",
    zipCode: 23028,
    streetAddress: "5, Iwo Road",
  },
];
