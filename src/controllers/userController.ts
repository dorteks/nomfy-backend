import { PrismaClient } from "@prisma/client";

const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const sendMail = require("../sendMail");

module.exports.getAllUsers = async (req: any, res: any) => {
  const users = await prisma.user.findMany();
  console.log("retrieved users");
  return res.json(users);
};

module.exports.signup = async (req: any, res: any) => {
  const { firstName, lastName, email, password, role, code } = req.body;

  // hash password
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("salt>>>>>", salt, "hashedPassword>>>", hashedPassword);

    // validate user email
    const existingUser: any = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        email: true,
      },
    });

    if (existingUser?.email === req.body.email) {
      console.log(`>>>user with email ${existingUser?.email} already exist>>>`);
      return res.json({
        message: `user with email ${existingUser?.email} already exist`,
      });
    }

    // create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
    });
    console.log(
      `user ${user.firstName} with email ${user.email} has been created`,
      user
    );
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("problem creating user");
  }
  return;
};

module.exports.login = async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log(">>>user log in details provided>>>", email, password);

  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
    select: { email: true, password: true },
  });

  if (user == null) {
    return res.status(404).send("cannot find user");
  }

  try {
    const isPasswordCorrect = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.send("password isincorrect");
    }
    return res.send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).send("problem logging in");
  }
};

module.exports.forgot_password = async (req: any, res: any) => {
  const { newPassword, email } = req.body;
  console.log(email, newPassword);

  // send forgot password code
  const existingUser = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      email: true,
    },
  });

  if (existingUser?.email === req.body.email) {
    //  sendMail(email, otpcode)
    console.log(`>>>code sent to verify user >>>`);
    // verifyOTP function goes here
  } else {
    console.log(">>>>does not exist");
  }

  // change password
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
    console.log(">>>new password hash", hashPassword);

    const changePassword = await prisma.user.update({
      where: {
        email: req.body.email,
      },
      data: {
        password: hashPassword,
      },
    });
    console.log(changePassword);
    return res.send("password successfully updated");
  } catch (error) {
    res.status(400).send("An error occured");
  }
  return res.json("Done");
};

module.exports.create_OTP = async (req: any, res: any) => {
  const { email } = req.body;
  console.log(email);

  const otpCode = `${Math.floor(100000 + Math.random() * 900000)}`;
  console.log(otpCode);

  try {
    const salt = await bcrypt.genSalt();
    const hashOTPCode = await bcrypt.hash(otpCode, salt);
    console.log(">>>otp hash", hashOTPCode, ">>>>otpcode", otpCode);

    const generatedOTPCode = await prisma.oTP.update({
      data: {
        code: otpCode,
      },
      where: { email: req.body.email },
    });

    sendMail(email, otpCode);
    console.log(generatedOTPCode);
    return res.json("Pending: Verification code had been sent to your email");
  } catch (error) {
    console.log(error);
    return res.send("Failed to send verification code");
  }
};

module.exports.verify_OTP = async (req: any, res: any) => {
  const { inputOTP, email } = req.body;
  console.log(inputOTP, email);

  const savedOTP = await prisma.oTP.findUnique({
    where: {
      email: req.body.email,
    },
    select: {
      code: true,
    },
  });
  console.log(savedOTP);

  if (savedOTP?.code === req.body.inputOTP) {
    return res.send("success");
  } else {
    return res.send("Incorrect OTP, Kindly input the OTP send to your mail");
  }
  return;
};