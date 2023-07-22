import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const POST = async (req) => {
  try {
    const body = await req.json();
    const { token, password } = body;
    const date = Date.now();
    const user = await prisma.user.findFirst({
      where: {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: {
          gt: date,
        },
      },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newData = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedPassword,
        forgotPasswordTokenExpiry: null,
        forgotPasswordToken: null,
      },
    });
    return NextResponse.json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
