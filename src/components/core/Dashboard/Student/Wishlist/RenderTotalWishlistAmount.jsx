import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { addToCart } from "../../../../../slices/cartSlice";
import { removeFromWishlist } from "../../../../../slices/wishlistSlice";

const RendertotalWishlistAmount = () => {
  const { totalWishlist, wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    wishlist.map((course) => {
      dispatch(addToCart(course));
      dispatch(removeFromWishlist(course._id));
      return 1;
    });
    // console.log("Buy Course", courses)
  };

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblue-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">
        Total Amount:
      </p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">
        Rs {totalWishlist}
      </p>

      {/* button */}
      <IconBtn
        text="Add All To Cart"
        onclick={handleAddToCart}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
};

export default RendertotalWishlistAmount;
