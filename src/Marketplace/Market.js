import { Link, useHistory } from "react-router-dom";
import db from "../firebase";
import "./Market.css";
import { useStateValue } from "../StateProvider";
import { useEffect, useState } from "react";
function Market() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [list, setlist] = useState([]);

  useEffect(() => {
    db.collection("Listings")
      .orderBy("list_Timestamp", "desc")
      .onSnapshot((snap) =>
        setlist(
          snap.docs.map((doc) => ({
            listid: doc.id,
            listdata: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <>
      <div className="App">
        <div class="left">
          {" "}
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
            <span class="left_text">Cart</span>
          </Link>
          <Link
            to="/Facebook/MarketPlace/List_Item"
            class={
              window.location.pathname == "/Facebook/MarketPlace/List_Item"
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

        <div class="center centerproduct ">
          {list[0] ? (
            list.map(
              ({
                listid,
                listdata: {
                  List_image,
                  list_loc,
                  list_price,
                  list_name,
                  list_userImage,
                  list_UserName,
                  list_Timestamp,
                },
              }) => (
                <div
                  onClick={(e) => {
                    history.push(`/Facebook/MarketPlace/Listings/${listid}`);
                  }}
                  key={listid}
                  class="product"
                >
                  <img
                    height="320px"
                    width="100%"
                    class="product_image"
                    src={List_image}
                    alt=""
                  />
                  <div class="product_info">
                    <span class="price">
                      ${" "}
                      {list_price == [] || list_price == 0
                        ? "Free"
                        : list_price}
                    </span>
                    <span class="product_name">{list_name}</span>
                    <span class="product_loc">{list_loc}</span>
                  </div>
                </div>
              )
            )
          ) : (
            <button
              onClick={(e) => {
                history.push(`/Facebook/MarketPlace/List_Item`);
              }}
              className="followbutton"
            >
              Create Listing
            </button>
          )}
        </div>
        <div class="right"></div>
      </div>
    </>
  );
}

export default Market;
