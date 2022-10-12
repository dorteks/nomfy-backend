const nodemailer = require("nodemailer");

const sendMail = async (email: String, otpCode: String) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });
  const mailOptions = {
    from: "favian.olson18@ethereal.email",
    to: email,
    subject: "Verify Your Email",
    text: `${otpCode}`,
    code: `${otpCode}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
