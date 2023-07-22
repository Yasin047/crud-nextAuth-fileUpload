import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcrypt.hash(userId, 10);
    const data = {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000,
    };
    const forgotData = {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: Date.now() + 3600000,
    };
    if (emailType === "VERIFY") {
      await prisma.user.update({
        where: { email },
        data: { ...data },
      });
    } else if (emailType === "RESET") {
      await prisma.user.update({
        where: { email },
        data: { ...forgotData },
      });
    }
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "yasinmahmud0047@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click 
      <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.log(error);
  }
};
