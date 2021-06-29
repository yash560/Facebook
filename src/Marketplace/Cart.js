import { Link, useHistory } from "react-router-dom";
import db, { storage } from "../firebase";
import { totalprice } from "../reducer";

import "./Market.css";
import { useStateValue } from "../StateProvider";
import { useState } from "react";
import firebase from "firebase";
import Cart_Item from "./Cart_Item";
function Cart() {
  const [{ user, basket }, dispatch] = useStateValue();
  const history = useHistory();
  const [listing, setlisting] = useState(null);
  const [list_name, setlist_name] = useState([]);
  const [list_price, setlist_price] = useState([]);
  const [list_loc, setlist_loc] = useState([]);
  console.log(basket?.itemName);

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
          {basket[0] ? (
            basket.map((item) => (
              <>
                <Cart_Item
                  id={item.itemId}
                  itemLoc={item.itemLoc}
                  itemPrice={item.itemPrice}
                  itemName={item.itemName}
                  image={item.itemImg}
                  listed_by={item.listed_by}
                  listed_by_id={item.listed_by_id}
                  listed_by_img={item.listed_by_img}
                />
              </>
            ))
          ) : (
            <button
              onClick={(e) => {
                history.push(`/Facebook/MarketPlace/Home`);
              }}
              className="followbutton"
            >
              Browse Items
            </button>
          )}
        </div>
        <div class="right">
          {" "}
          <form className="subtotal">
            <span className="total_cart_items">
              Subtotal({basket?.length} items)
              <span className="cart_amount"> ₹{totalprice(basket)}.00</span>
            </span>
            <br />

            <div className="proceed_cart">
              <button
                onClick={(e) => {
                  db.collection("users")
                    .doc(user?.uid)
                    .collection("order_history")
                    .add({
                      basket: basket,
                      timestamp:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    });
                  alert("ORDER CONFIRMED").then(
                    history.push("/Facebook/MarketPlace/Order_History")
                  );
                }}
                className="followbutton"
              >
                Checkout
              </button>

              <p className="errorMessage"></p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Cart;
