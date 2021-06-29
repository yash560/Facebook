import { Link, useHistory } from "react-router-dom";
import db from "../firebase";
import "./Market.css";
import { useStateValue } from "../StateProvider";
function ListItem() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

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

        <div class="center productCenter">
          <Link to="/Facebook/MarketPlace/Additem" class="storyaddCard">
            <div class="itemstory">
              <i class="fa fa-plus"></i>
            </div>
            New Listing
          </Link>
        </div>
        <div class="right"></div>
      </div>
    </>
  );
}

export default ListItem;
