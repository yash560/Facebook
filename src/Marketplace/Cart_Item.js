import React from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Cart_Item({
  id,
  itemLoc,
  listed_by,
  listed_by_img,
  listed_by_id,
  image,
  itemPrice,
  itemName,
}) {
  const [{ user, basket }, dispatch] = useStateValue();
  const history = useHistory();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };
  return (
    <>
      {" "}
      <div
        onClick={(e) => {
          history.push(`/Facebook/MarketPlace/Listings/${id}`);
        }}
        class="product"
      >
        <img
          height="320px"
          width="100%"
          src={image}
          class="product_image"
          alt=""
        />
        <div class="product_info">
          <span class="price">$ {itemPrice} </span>
          <span class="product_name">{itemName}</span>
          <span class="product_loc">{itemLoc}</span>{" "}
        </div>{" "}
      </div>{" "}
      <button onClick={removeFromCart} className="followbutton">
        Remove
      </button>
    </>
  );
}

export default Cart_Item;
