import { Link, useHistory } from "react-router-dom";
import db, { storage } from "../firebase";
import "./Market.css";
import { useStateValue } from "../StateProvider";
import { useState } from "react";
import firebase from "firebase";
function Additem() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [listing, setlisting] = useState(null);
  const [list_name, setlist_name] = useState([]);
  const [list_price, setlist_price] = useState([]);
  const [list_loc, setlist_loc] = useState([]);

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
          </Link>{" "}
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
          <div class="login_details add_details">
            <input
              placeholder="Product Name"
              class="login_input"
              type="text"
              maxLength="25"
              onChange={(e) => {
                setlist_name(e.target.value);
              }}
              value={list_name}
            />
            <input
              placeholder="Product Price"
              class="login_input"
              type="number"
              min="0"
              max="999999"
              onChange={(e) => {
                setlist_price(e.target.value);
              }}
              value={list_price}
            />
            <input
              placeholder="Location"
              class="login_input"
              type="text"
              maxLength="25"
              onChange={(e) => {
                setlist_loc(e.target.value);
              }}
              value={list_loc}
            />
            <input
              placeholder="Photo Url (Optional) ..."
              class="login_input login_inputfile"
              type="file"
              accept="image/* "
              onChange={(e) => {
                if (e.target.files[0]) {
                  setlisting(e.target.files[0]);
                }
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                const upload = storage
                  .ref(`listings/${listing.name}`)
                  .put(listing);

                upload.on(
                  "state_changed",
                  (snapshot) => {},
                  (error) => {},
                  () => {
                    alert("Item Added");
                    storage
                      .ref("listings")
                      .child(listing.name)
                      .getDownloadURL()
                      .then((listingURL) => {
                        db.collection("users")
                          .doc(user?.uid)
                          .collection("Listings")
                          .add({
                            List_image: listingURL,
                            list_loc: list_loc,
                            userid: user?.uid,
                            list_price: list_price,
                            list_name: list_name,
                            list_userImage: user?.photoURL,
                            list_UserName: user?.displayName,
                            list_Timestamp:
                              firebase.firestore.FieldValue.serverTimestamp(),
                          });
                        db.collection("Listings")
                          .add({
                            List_image: listingURL,
                            list_loc: list_loc,
                            list_price: list_price,
                            userid: user?.uid,

                            list_name: list_name,
                            list_userImage: user?.photoURL,
                            list_UserName: user?.displayName,
                            list_Timestamp:
                              firebase.firestore.FieldValue.serverTimestamp(),
                          })
                          .then(history.push("/Facebook/MarketPlace/Home"));
                      });
                  }
                );
                setlisting(null);
                setlist_loc(" ");
                setlist_price(" ");
                setlist_name(" ");
              }}
              class="login_button"
              href=""
            >
              Add Listing
            </button>
          </div>
        </div>
        <div class="right"></div>
      </div>
    </>
  );
}

export default Additem;
