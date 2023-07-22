import { sendEmail } from "@/app/utils/mailer";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { email } = body;
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" });
    }
    const mailResponse = await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user.id,
    });
    return NextResponse.json({ msg: "Check your email" });
  } catch (error) {
    return NextResponse.json(
      { msg: "Error: " + error.message },
      { status: 400 }
    );
  }
};
