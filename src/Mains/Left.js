import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../media.css";
import { useStateValue } from "../StateProvider";
import "./Left.css";

function Left() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  return (
    <div class="left">
      <Link to="/Facebook/Timeline" class="left_component">
        <img
          class="left_user_image"
          src={user?.photoURL}
          alt=""
          height="30px"
        />
        <span class="left_text">{user?.displayName}</span>
      </Link>
      <Link to="/Facebook/friends" class="left_component">
        <div class="left_icon">
          <i class="fas fa-user-friends"></i>
        </div>
        <span class="left_text">Friends</span>
      </Link>
      <div
        onClick={(e) => {
          e.preventDefault();
          history.push(`/Facebook/Messenger/${user?.uid + "+" + user?.uid}`);
        }}
        class="left_component"
      >
        <div class="left_icon">
          <i class="fas fa-comment-alt"></i>
        </div>
        <span class="left_text">Messenger</span>
      </div>
      <Link to="/Facebook/MarketPlace/Home" class="left_component">
        <div class="left_icon">
          <i class="fas fa-store"></i>
        </div>
        <span class="left_text">MarketPlace</span>
      </Link>
      <Link to="/Facebook/Watch" class="left_component">
        <div class="left_icon">
          <i class="fab fa-youtube"></i>
        </div>
        <span class="left_text">Watch</span>
      </Link>
      <Link to="/Facebook/AllStory" class="left_component">
        <div class="left_icon">
          <i className="far fa-window-restore"></i>
        </div>
        <span class="left_text">Stories</span>
      </Link>
      <Link to="/Facebook/Saved" class="left_component">
        <div class="left_icon">
          <i class="fas fa-bookmark"></i>
        </div>
        <span class="left_text"> Saved</span>
      </Link>
      <div class="left_component">
        <div class="left_icon">
          <i class="fas fa-flag"></i>
        </div>
        <span class="left_text">Pages</span>
      </div>
    </div>
  );
}

export default Left;
