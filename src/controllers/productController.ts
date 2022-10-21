import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports.getAllProducts = async (req: any, res: any) => {
  const products = await prisma.product.findMany();
  res.send(products);
};

module.exports.create_product = async (req: any, res: any) => {
  const {
    description,
    featuredImage,
    gallery,
    unit,
    price,
    quantity,
    salesPrice,
    sku,
  } = req.body;
  const addProduct = await prisma.product.create({
    data: {
      description,
      featuredImage,
      gallery,
      unit,
      price,
      quantity,
      salesPrice,
      sku,
    },
  });
  console.log(addProduct);
  return res.send("product added successfully");
};

module.exports.update_product = async (req: any, res: any) => {
  const {
    description,
    featuredImage,
    gallery,
    unit,
    price,
    quantity,
    salesPrice,
    sku,
  } = req.body;

  const lookupProduct = await prisma.product.findUnique({
    where: { sku: req.body.sku },
    select: { quantity: true },
  });

  if (!lookupProduct) {
    return res.send(`product with sku ${req.body.sku} not found`);
  }
  try {
    const updateProduct = await prisma.product.update({
      where: { sku: req.body.sku },
      data: {
        description,
        featuredImage,
        gallery,
        unit,
        price,
        quantity,
        salesPrice,
        sku,
      },
    });
    console.log(">> product updated as follows:", updateProduct);
    return res.send(updateProduct);
  } catch (error) {
    console.log(error);
    res.send("Could not update product");
  }
};

module.exports.delete_product = async (req: any, res: any) => {
  const lookupProduct = await prisma.product.findUnique({
    where: { sku: req.body.sku },
    select: { quantity: true },
  });

  if (!lookupProduct) {
    return res.send("product not found");
  }

  try {
    await prisma.product.delete({
      where: { sku: req.body.sku },
    });
    res.send("product deleted");
  } catch (error) {
    console.log(error);
    res.send("error deleting product");
  }
};
