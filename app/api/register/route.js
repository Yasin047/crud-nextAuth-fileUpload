import { sendEmail } from "@/app/utils/mailer";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });
  await sendEmail({ email, emailType: "VERIFY", userId: user.id });

  return NextResponse.json({
    msg: "User is created successfully! Check your Email",
    user,
  });
}
