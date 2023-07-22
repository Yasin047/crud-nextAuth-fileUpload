import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const POST = async (req) => {
  try {
    const body = await req.json();
    const { token } = body;
    const date = Date.now();
    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiry: {
          gt: date,
        },
      },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verifyTokenExpiry: null,
        verifyToken: null,
      },
    });
    return NextResponse.json({
      message: "Email verification successful",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
