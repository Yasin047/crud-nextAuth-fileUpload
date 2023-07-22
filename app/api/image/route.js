import cloudinary from "@/app/utils/cloudinary";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { NextResponse } from "next/server";
import os from "os";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req) {
  const formData = await req.formData();

  var imageUrlList = [];
  var imagePublickId = [];
  var imagePathList = [];

  for (const formDataEntryValue of formDataEntryValues) {
    const arrayBuffer = await formDataEntryValue.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tempdir = os.tmpdir();
    const filePath = path.join(tempdir, formDataEntryValue.name);
    fs.writeFileSync(filePath, buffer);
    imagePathList.push(filePath);
  }

  for (var i = 0; i < imagePathList.length; i++) {
    var productFile = imagePathList[i];
    const uploadRes = await cloudinary.uploader.upload(productFile, {
      folder: "products",
    });

    imageUrlList.push(uploadRes.url);
    imagePublickId.push(uploadRes.public_id);

    if (uploadRes) {
      fs.unlink(productFile, function (err) {
        if (err) throw err;
      });
    }
  }
  const imgData = await prisma.image.create({
    data: {
      public_id: imagePublickId,
      url: imageUrlList,
    },
  });
  return NextResponse.json({ success: true });
}

export const GET = async (req, res) => {
  const image = await prisma.image.findMany();
  if (!image) {
    return NextResponse.json({ success: false, message: "Image not found!" });
  }
  return NextResponse.json({ success: true, image });
};
