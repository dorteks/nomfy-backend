import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports.getAllProductGroups = async (req: any, res: any) => {
  const productGroups = await prisma.productGroup.findMany();
  console.log("productgroups fetched");
  return res.send(productGroups);
};

module.exports.create_productGroup = async (req: any, res: any) => {
  const { name, icon } = req.body;

  const createProductGroup = await prisma.productGroup.create({
    data: { name, icon },
  });
  console.log(createProductGroup);
  return res.send("product group added");
};
