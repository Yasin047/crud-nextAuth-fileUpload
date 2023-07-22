import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function PUT(request, { params }) {
  const body = await request.json();
  const { todo } = body;
  const { id } = params;
  if (!id) {
    NextResponse.error();
  }
  const todoID = await prisma.todo.findFirst(id);
  if (!todoID) {
    return NextResponse.json({ msg: "Todo is not found" });
  }
  const data = await prisma.todo.update({
    where: { id },
    data: { todo },
  });
  return NextResponse.json({
    msg: "Todo is updated successfully!",
  });
}

export async function DELETE(request, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.error();
  }
  const todoID = await prisma.todo.delete({ where: { id } });
  return NextResponse.json({
    msg: "Todo is deleted successfully!",
  });
}
