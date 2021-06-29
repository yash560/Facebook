import { Link, useHistory } from "react-router-dom";
import db, { storage } from "../firebase";
import { totalprice } from "../reducer";

import "./Market.css";
import { useStateValue } from "../StateProvider";
import { useEffect, useState } from "react";
import firebase from "firebase";
import Cart_Item from "./Cart_Item";
function Order_History() {
  const [{ user, basket }, dispatch] = useStateValue();
  const history = useHistory();
  const [listing, setlisting] = useState(null);
  const [list_name, setlist_name] = useState([]);
  const [list_price, setlist_price] = useState([]);
  const [orders, setorders] = useState([]);
  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .collection("order_history")
      .onSnapshot((snap) =>
        setorders(
          snap.docs.map((doc) => ({
            orderId: doc.id,
            orderData: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <>
      <div className="App">
        <div class="left">
          <Link
            to="/Facebook/MarketPlace/Home"
            class={
              window.location.pathname == "/Facebook/MarketPlace/Home"
                ? "active_left"
                : " left_component"
            }
          >
            <div class="left_icon">
              <i class="fas fa-store"></i>
            </div>
            <span class="left_text">Browse All</span>
          </Link>
          <Link
            to="/Facebook/MarketPlace/My_listings"
            class={
              window.location.pathname == "/Facebook/MarketPlace/My_listings"
                ? "active_left"
                : " left_component"
            }
          >
            <div class="left_icon">
              <i class="fas fa-store"></i>
            </div>
            <span class="left_text">Your Listings</span>
          </Link>{" "}
          <Link
            to="/Facebook/MarketPlace/Order_History"
            class={
              window.location.pathname == "/Facebook/MarketPlace/Order_History"
                ? "active_left"
                : " left_component"
            }
          >
            <div class="left_icon">
              <i class="fas fa-store"></i>
            </div>
            <span class="left_text">Order History</span>
          </Link>
          <Link
            to="/Facebook/MarketPlace/Cart"
            class={
              window.location.pathname == "/Facebook/MarketPlace/Cart"
                ? "active_left"
                : " left_component"
            }
          >
            <div class="left_icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <span class="left_text">
              Cart ({basket[0] ? basket.length : " "})
            </span>
          </Link>
          <Link
            to="/Facebook/MarketPlace/List_Item"
            class={
              window.location.pathname == "/Facebook/MarketPlace/List_Item" ||
              window.location.pathname == "/Facebook/MarketPlace/Additem"
                ? "active_left"
                : " left_component"
            }
          >
            <div class="left_icon">
              <i class="fas fa-plus"></i>
            </div>
            <span class="left_text">Create New Listing</span>
          </Link>
        </div>

        <div class="center productCenter">
          {orders.map(({ orderId, orderData: { basket, timestamp } }) => (
            <div class="orders">
              {new Date(timestamp?.toDate()).toLocaleDateString()}
              {basket.map(
                ({
                  itemLoc,
                  itemPrice,
                  itemName,
                  itemImg,
                  listed_by,
                  itemId,
                  listed_by_img,
                  listed_by_id,
                }) => (
                  <div class="basketProduct">
                    {console.log(itemImg)}
                    <img className="historyImg" width="100px" height="100px" src={itemImg} />
                    <div class="orderProductright">
                      <span>{itemName}</span>
                      <span>$ {itemPrice}</span>
                      <span>{itemLoc}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        </div>

        <div class="right"> </div>
      </div>
    </>
  );
}
export default Order_History;
