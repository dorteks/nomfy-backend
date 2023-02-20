import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

module.exports.getAllAddress = async (req: any, res: any) => {
  const address = await prisma.address.findMany();
  console.log("retrieved all address");
  return res.send(address);
};

module.exports.getOneAddress = async (req: any, res: any) => {
  const addressId = parseInt(req.params.addressId, 10);
  const oneAddress = await prisma.address.findUnique({
    select: {
      id: true,
      state: true,
      city: true,
      country: true,
      zipCode: true,
      streetAddress: true,
    },
    where: { id: addressId },
  });
  if (!oneAddress) {
    return res.send("shop not found");
  } else {
    return res.send(oneAddress);
  }
};

module.exports.createAddress = async (req: any, res: any) => {
  const { country, state, city, zipCode, streetAddress } = req.body;

  const createNewAddress = await prisma.address.create({
    data: { country, state, city, zipCode, streetAddress },
  });
  return res.send(createNewAddress);
};

module.exports.updateAddress = async (req: any, res: any) => {
  const { country, state, city, zipCode, streetAddress } = req.body;

  try {
    const updateAddress = await prisma.address.update({
      where: { id: req.body.id },
      data: { country, state, city, zipCode, streetAddress },
    });
    console.log("address updated", updateAddress);
    return res.send("address updated successfully");
  } catch (error) {
    console.log(error);
    return res.send("error updating address");
  }
};

module.exports.deleteAddress = async (req: any, res: any) => {
  const addressId = parseInt(req.params.addressId, 10);

  const lookupAddress = await prisma.address.findUnique({
    where: { id: addressId },
    select: { streetAddress: true },
  });

  if (!lookupAddress) {
    return res.send("address not found");
  }

  try {
    const deleteAddress = await prisma.address.delete({
      where: { id: addressId },
      select: { streetAddress: true },
    });
    console.log("address deleted", deleteAddress);
    return res.send("address deleted successffuly");
  } catch (error) {
    console.log(error);
    return res.send("error deleting address");
  }
};
