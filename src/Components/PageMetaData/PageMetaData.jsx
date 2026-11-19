import React from "react";

export default function PageMetaData({
  title = "MartCart",
  description = "Discover fresh deals and best-selling products on MartCart",
  keywords = "MartCart, grocery, deals, fresh food, online shopping, offers",
  author = "Hisham Wahba",
}) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
    </>
  );
}
