import { useState, useEffect } from "react";

const RestaurantImageLoading = ({ src }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setImageSrc(src);
    }, 2000);
  }, [src]);

  return (
    <>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          style={{
            width: "100%",
            height: "132px",
            borderRadius: "2px 2px 0px 0px",
          }}
        />
      ) : (
        <img
          className="restaurant-img"
          alt=""
          style={{
            width: "100%",
            height: "132px",
            borderRadius: "2px 2px 0px 0px",
          }}
        />
      )}
    </>
  );
};

export default RestaurantImageLoading;
