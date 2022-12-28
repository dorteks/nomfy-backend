import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports.getAllProducts = async (req: any, res: any) => {
  const products = await prisma.product.findMany();
  res.send(products);
};

module.exports.getOneProduct = async (req: any, res: any) => {
  const productId = parseInt(req.params.productId, 10);

  const oneProduct = await prisma.product.findUnique({
    select: {
      id: true,
      price: true,
      quantity: true,
      salesPrice: true,
    },
    where: {
      id: productId,
    },
  });
  if (!oneProduct) {
    return res.send("product not found");
  } else {
    return res.send(oneProduct);
  }
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

  if (!addProduct) {
    res.send("error creating product");
  } else {
    return res.status(200).send("Product added");
  }
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
    // select: { quantity: true },
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
  const productId = parseInt(req.params.productId, 10);

  const lookupProduct = await prisma.product.findUnique({
    where: { id: productId },
    select: { description: true },
  });

  if (!lookupProduct) {
    return res.send("product not found");
  }

  try {
    await prisma.product.delete({
      where: { id: productId },
    });
    res.send("product deleted");
  } catch (error) {
    console.log(error);
    res.send("error deleting product");
  }
};
