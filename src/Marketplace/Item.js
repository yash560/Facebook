import { Link, useHistory } from "react-router-dom";
import db, { storage } from "../firebase";
import "./Market.css";
import { useStateValue } from "../StateProvider";
import { useEffect, useState } from "react";
import firebase from "firebase";
function Item() {
  const [{ user, basket }, dispatch] = useStateValue();
  const history = useHistory();

  var token = window.location.pathname.split("/").slice(4).toString();
  const [item, setitem] = useState([]);

  useEffect(() => {
    db.collection("Listings")
      .doc(token)
      .onSnapshot((snap) => setitem(snap.data()));
  }, []);
  console.log(item);

  return (
    <>
      {user ? (
        <div className="App ITEM">
          <div class="center itemCenter">
            <div onClick={(e) => history.goBack()} class="close">
              <i class="fa fa-plus"></i>
            </div>
            <img
              class="back_item_img"
              height="100%"
              width="100%"
              src={item?.List_image}
            />
            <div class="main_item_box">
              <img class="" height="100%" width="100%" src={item?.List_image} />
            </div>
          </div>
          <div class=" right_item">
            <Link class="left_component itemrigtheader">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  history.push(
                    `/Facebook/Messenger/${user?.uid + "+" + user?.uid}`
                  );
                }}
                className="header_right_icons"
              >
                <i className="far fa-comment-alt"></i>
              </div>
              <div className="header_right_icons">
                <i className="far fa-bell"></i>
              </div>
              <div
                onClick={(e) => {
                  history.push("/Facebook/MarketPlace/Cart");
                }}
                className="header_right_icons"
              >
                <i class="fas fa-shopping-cart"></i>
                <span class="cartLength">{basket.length}</span>
              </div>
              <div
                onClick={(e) => {
                  history.push("/Facebook/MarketPlace/Home");
                }}
                className="header_right_icons"
              >
                <i className="fas fa-store"></i>
              </div>
            </Link>{" "}
            <img
              class="itemnone"
              height="100%"
              width="100%"
              src={item?.List_image}
            />
            <div class="seller_item">
              <span class=" item_text">
                {item?.list_name}
                <br />
                <span class="price_text">
                  ₹{" "}
                  {item?.list_price == [] || item?.list_price == 0
                    ? "Free"
                    : item?.list_price}{" "}
                  . In Stock
                </span>
                <div class="item__price left_icon">
                  Listed in {item?.list_loc}
                </div>
              </span>
            </div>
            <div class="seller_item">
              <span class=" item_text">Seller Information</span>
              <div class="people">
                <img
                  height="50px"
                  width="50px"
                  class="people_user_img"
                  src={item?.list_userImage}
                  alt=""
                />
                <div class="follow_name">{item?.list_UserName}</div>
              </div>
            </div>
            <div class="seller_item">
              <span class=" item_text_small">
                {user?.uid == item?.userid
                  ? "You Added This Product"
                  : " Send A message to seller"}
              </span>
              {user?.uid == item?.userid ? (
                <div
                  onClick={() => {
                    db.collection("users")
                      .doc(user?.uid)
                      .collection("Listings")
                      .doc(token)
                      .delete();
                    db.collection("Listings")
                      .doc(token)
                      .delete()
                      .then(history.push("/Facebook/MarketPlace/Home"));
                  }}
                  class="followbutton item_text_button"
                >
                  Delete Listing
                </div>
              ) : (
                <div
                  onClick={() => {
                    history.push(
                      `/Facebook/Messenger/${user?.uid}+${item?.userid}`
                    );
                  }}
                  class="followbutton item_text_button"
                >
                  Send
                </div>
              )}
            </div>
            {user?.uid == item?.userid ? (
              " "
            ) : (
              <div
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    item: {
                      itemId: token,
                      itemName: item?.list_name,
                      itemImg: item?.List_image,
                      itemPrice: item?.list_price,
                      itemLoc: item?.list_loc,
                      listed_by_id: item?.userid,
                      listed_by: item?.list_UserName,
                      listed_by_img: item?.list_userImage,
                    },
                  });
                }}
                class="followbutton item_text_button"
              >
                Add To
                <i class="fas fa-shopping-cart"></i>
              </div>
            )}
          </div>
        </div>
      ) : (
        history.push(`/`)
      )}
    </>
  );
}

export default Item;
