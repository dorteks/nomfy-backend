import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports.getAlProductCategories = async (req: any, res: any) => {
  const productCategories = await prisma.productCategory.findMany();
  console.log("retrieved all product categories");
  return res.send(productCategories);
};

module.exports.create_productCategory = async (req: any, res: any) => {
  const { name, description, image, slug } = req.body;

  const createProductCategory = await prisma.productCategory.create({
    data: { name, description, image, slug },
  });
  console.log("added a product category", createProductCategory);
  return res.send("added productCategory");
};

module.exports.update_productCategory = async (req: any, res: any) => {
  const { name, description, image, slug } = req.body;
  try {
    const updateProductCategory = await prisma.productCategory.update({
      where: { slug: req.body.slug },
      data: { name, description, image, slug },
    });
    console.log("product category updated", updateProductCategory);
    return res.send("productCategory updated successfully");
  } catch (error) {
    console.log(error);
    res.send("error updating productCategory");
  }
};

module.exports.delete_productCategory = async (req: any, res: any) => {
  const { slug } = req.body;

  const lookupProductCategory = await prisma.productCategory.findUnique({
    where: { slug: slug },
    select: { name: true },
  });

  if (!lookupProductCategory) {
    return res.send("productCategory not found");
  }

  try {
    await prisma.productCategory.delete({
      where: { slug: slug },
      select: { name: true },
    });
    console.log("productCategory deleted");
    return res.send("productCategory deleted");
  } catch (error) {
    console.log(error);
    return res.send("productCategory deleted");
  }
};
