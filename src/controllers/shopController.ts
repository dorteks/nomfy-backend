import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports.getAllShops = async (req: any, res: any) => {
  const shops = await prisma.shop.findMany();
  res.send(shops);
};

module.exports.create_shop = async (req: any, res: any) => {
  const {
    name,
    logo,
    description,
    website,
    phoneNumber,
    facebookLink,
    instagramLink,
    twitterLink,
    youtubeLink,
  } = req.body;

  const shop = await prisma.shop.create({
    data: {
      name,
      logo,
      description,
      website,
      phoneNumber,
      facebookLink,
      instagramLink,
      twitterLink,
      youtubeLink,
    },
  });
  console.log(">>>new shop addeed", shop);
  return res.send(shop);
};

module.exports.update_shop = async (req: any, res: any) => {
  const {
    name,
    logo,
    description,
    website,
    phoneNumber,
    facebookLink,
    instagramLink,
    twitterLink,
    youtubeLink,
  } = req.body;

  const lookupShop = await prisma.shop.findUnique({
    where: { name: req.body.name },
  });
  if (!lookupShop) {
    return res.send("shop does not exist");
  }

  try {
    const updateShop = await prisma.shop.update({
      where: { name: name },
      data: {
        name,
        logo,
        description,
        website,
        phoneNumber,
        facebookLink,
        instagramLink,
        twitterLink,
        youtubeLink,
      },
    });
    console.log(">>> updated shop", updateShop);
    res.send(updateShop);
  } catch (error) {
    console.log(error);
    res.send("could not update shop");
  }
};

module.exports.delete_shop = async (req: any, res: any) => {
  const { name } = req.body;

  const lookupShop = await prisma.shop.findUnique({
    where: { name: name },
  });
  if (!lookupShop) {
    return res.send("shop does not exist");
  }

  try {
    await prisma.shop.delete({
      where: { name: name },
    });
    console.log(">>shop deleted");
    return res.send("shop deleted");
  } catch (error) {
    console.log(error);
    res.send("error deleting shop");
  }
};
