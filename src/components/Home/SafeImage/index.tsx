"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function SafeImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc || "/banners/banner5.png"}
      alt={alt}
      onError={() => setImgSrc("/banners/banner5.png")}
      unoptimized 
    />
  );
}
