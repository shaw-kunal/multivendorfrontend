import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;
  const product_name = d.replace(/\s/g, "-");

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    // dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    // dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    // const isItemExists = cart && cart.find((i) => i._id === id);
    // if (isItemExists) {
    //   toast.error("Item already in cart!");
    // } else {
    //   if (data.stock < 1) {
    //     toast.error("Product stock limited!");
    //   } else {
    //     const cartData = { ...data, qty: 1 };
    //     dispatch(addTocart(cartData));
    //     toast.success("Item added to cart successfully!");
    //   }
    // }
  };

  
  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
          <img
            src={import.meta.env.VITE_IMAGE + data.images[0]}
            alt="image"
            className="w-full h-[170px] object-contain"
          />

        </Link>
        {/* link for shop name */}
        <Link to={`/shop/preview/${data.shopId}`}>
          <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>

          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#f6ba00"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#f6ba00"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#f6ba00"
              size={20}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#f6ba00"
              size={20}
            />
            <AiOutlineStar
              className="mr-2 cursor-pointer"
              color="#f6ba00"
              size={20}
            />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>

                {data?.originalPrice === 0 ? data?.originalPrice : data?.discountPrice} $
              </h5>
              {/* issue data price not showing even though it exists */}
              <h4 className={`${styles.price}`}>

                {data?.originalPrice ? data?.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.total_sell || 2} sold
            </span>
          </div>
        </Link>

        {/* side options -- icons */}
        <div>
          {/* wishlist heart */}
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}

          {/* quick view icon */}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          {/* add to cart icon */}
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
