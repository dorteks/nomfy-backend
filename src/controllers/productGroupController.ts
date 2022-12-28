import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports.getAllProductGroups = async (req: any, res: any) => {
  const productGroups = await prisma.productGroup.findMany();
  console.log("productgroups fetched");
  res.send(productGroups);
};

module.exports.create_productGroup = async (req: any, res: any) => {
  const { name, icon } = req.body;

  const createGroup = await prisma.productGroup.create({
    data: { name, icon },
  });
  console.log(">>> product group added", createGroup);
  return res.send(createGroup);
};

module.exports.update_productGroup = async (req: any, res: any) => {
  const { name, icon } = req.body;

  const updateProductGroup = await prisma.productGroup.update({
    where: { id: req.body.id },
    data: { name, icon },
  });
  console.log("id", req.body.id);
  console.log("updated productGroup", updateProductGroup);
  return res.send("product group updated successfully");
};

module.exports.delete_productGroup = async (req: any, res: any) => {
  const { name } = req.body;

  const lookupProductGroup = await prisma.productGroup.findUnique({
    where: { id: req.body.id },
    select: { name: true },
  });

  if (!lookupProductGroup) {
    return res.send("productGroup not found");
  }

  try {
    const deleteProductGroup = await prisma.productGroup.delete({
      where: { id: req.body.id },
      select: { name: true },
    });
    console.log(`productGroup ${name} deleted`, deleteProductGroup);
    return res.send(`productGroup ${name} successfully deleted`);
  } catch (error) {
    console.log(error);
    return res.send("error deleting productGroup");
  }
};
