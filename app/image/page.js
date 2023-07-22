"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const page = () => {
  const [image, setImage] = useState([]);
  const [imageResponse, setImageResponse] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < image.length; i++) {
      data.append("image", image[i]);
    }
    await axios.post("api/image", data);
  };
  useEffect(() => {
    axios
      .get("api/image")
      .then((res) => setImageResponse(res?.data?.image))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="h-12 w-80 "
          type="file"
          multiple
          onChange={(e) => setImage(e.target.files)}
          placeholder="Image"
        />
        <button className="h-12 w-24 bg-black text-white">submit</button>
      </form>
      <div>
        {imageResponse?.map((image) => {
          return (
            <div key={image.id}>
              <Image
                src={image.url[1]}
                alt="Picture of the author"
                width={200}
                height={200}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
