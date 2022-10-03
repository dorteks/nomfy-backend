import { Prisma } from "@prisma/client";

export const User: Prisma.UserCreateInput[] = [
  {
    firstName: "Tolu",
    middleName: "Tolu",
    lastName: "Tolu",
    role: "VENDOR",
    avatar: "url/tolu_avatar",
    email: "tolu@example.com",
    phone: "+234 9123XX",
    password: "*****",
  },
];
