import React, { useEffect, useState } from "react";
import db from "./firebase";
import "./Friends.css";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import "./media.css";
import Private_Posts from "./Mains/Private_Posts";

function Friends() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [userData, setuserData] = useState([]);
  const [tokens, settokens] = useState("WL8U5cYkCuY5kT16h4SGziZYgYu1");
  const [timeline, settimeline] = useState("");
  const [updatedlocation, setupdatedlocation] = useState([]);
  const [updatedimage, setupdatedimage] = useState([]);
  const [updatedwork, setupdatedwork] = useState([]);
  const [updatedschool, setupdatedschool] = useState([]);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);
  const [privateposts, setprivateposts] = useState([]);
  const [followingtoken, setfollowingtoken] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .collection("following")
      .onSnapshot((snap) =>
        setfollowingtoken(
          snap.docs.map((doc) => ({
            followingtokendocId: doc.id,
            followingtokenData: doc.data(),
          }))
        )
      );
    db.collection("users").onSnapshot((snap) =>
      setuserData(
        snap.docs.map((doc) => ({
          userdocId: doc.id,
          usersData: doc.data(),
        }))
      )
    );
    db.collection("users")
      .doc(tokens)
      .onSnapshot((snap) => settimeline(snap.data()));
  }, []);
  useEffect(() => {
    db.collection("users")
      .doc(tokens)
      .collection("following")
      .onSnapshot((snap) => {
        setfollowing(
          snap.docs.map((doc) => ({
            followingid: doc.id,
            followingdata: doc.data(),
          }))
        );
      });
    db.collection("users")
      .doc(tokens)
      .collection("followers")
      .onSnapshot((snap) => {
        setfollowers(
          snap.docs.map((doc) => ({
            followersid: doc.id,
            followersdata: doc.data(),
          }))
        );
      });
    db.collection("users")
      .doc(tokens)
      .onSnapshot((snap) => settimeline(snap.data()));

    db.collection("users")
      .doc(tokens)
      .collection("data")
      .doc(tokens)
      .onSnapshot((snap) => {
        setupdatedimage(snap.data());
      });
    db.collection("users")
      .doc(tokens)
      .collection("location")
      .doc(tokens)
      .onSnapshot((snap) => {
        setupdatedlocation(snap.data());
      });
    db.collection("users")
      .doc(tokens)
      .collection("Work")
      .doc(tokens)
      .onSnapshot((snap) => {
        setupdatedwork(snap.data());
      });
    db.collection("users")
      .doc(tokens)
      .collection("School")
      .doc(tokens)
      .onSnapshot((snap) => {
        setupdatedschool(snap.data());
      });
    db.collection("users")
      .doc(tokens)
      .collection("posts")
      .orderBy("postTimestamp", "desc")
      .onSnapshot((snap) => {
        setprivateposts(
          snap.docs.map((doc) => ({
            postId: doc.id,
            postData: doc.data(),
          }))
        );
      });
  }, [tokens]);
  return (
    <div className="friends">
      <div class="friends_left">
        <span class="text_friends">
          People You May Know <i class="fas fa-cog"></i>
        </span>
        {userData.map(
          ({
            userdocId,
            usersData: {
              image,
              userEmail,
              userId,
              work,
              location,
              school,
              userPhoto,
              userphone,
              user_name,
            },
          }) => (
            <div
              onClick={() => {
                history.push(`/Facebook/friends/${userId}`);
                settokens(userId);
              }}
              class={user?.uid == userdocId ? "own_profile" : "people"}
            >
              <img
                height="50px"
                width="50px"
                class="people_user_img"
                src={userPhoto}
                alt=""
              />
              <div class="follow_name">
                {user_name}
                <div class="follow_buttons">
                  <div
                    id="hey"
                    onClick={() => {
                      db.collection("users")
                        .doc(userdocId)
                        .collection("followers")
                        .doc(user?.uid)
                        .set({
                          isFollowing: true,
                          userPhoto: user?.photoURL,
                          userId: user?.uid,
                          userEmail: user?.email,
                          user_name: user?.displayName,
                          userphone: user?.phoneNumber,
                        });
                      var elem = document.getElementById("followbutton");

                      db.collection("users")
                        .doc(user?.uid)
                        .collection("following")
                        .add({
                          isFollowing: true,
                          userPhoto: userPhoto,
                          userId: userdocId,
                          userEmail: userEmail,
                          user_name: user_name,
                          userphone: userphone,
                        })
                        .then(alert("Followed"));
                    }}
                    class="followbutton"
                  >
                    FOLLOW
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div class="friends_right">
        <div class="img_people_container">
          {" "}
          <img
            className="timeline_image"
            width="100%"
            height="100%"
            alt=""
            src={updatedimage?.image}
          />
          <div class="timeline_people_user_image">
            <img
              className="timeline_people_image"
              class="people_user_img"
              alt=""
              src={timeline?.userPhoto}
            />
          </div>
        </div>
        <div class="timeline_people_option_conatainer">
          <span class="timeline_people_option">
            Posts
            <div class="info_dropdown info_dropdown_posts">
              <div class="about_div_main">
                {privateposts[0]
                  ? privateposts.map(
                      ({
                        postId,
                        postData: {
                          postTimestamp,
                          postUserName,
                          post_text,
                          imagepost,
                          userImage,
                        },
                      }) => (
                        <Private_Posts
                          postTimestamp={postTimestamp}
                          postId={postId}
                          key={postId}
                          userImage={userImage}
                          postUserName={postUserName}
                          post_text={post_text}
                          imagepost={imagepost}
                        />
                      )
                    )
                  : "No Posts"}
              </div>
            </div>
          </span>
          <span class="timeline_people_option">
            About
            <div class="info_dropdown">
              <div class="about_div_main">
                <div class="about_div_left">
                  <div class="about_div_comp about_div_comp_head">About</div>
                  <div class="about_div_comp">OverView</div>
                </div>
                <form class="about_div_right">
                  <div class="about_div_comp">
                    <span>
                      <i class="fas icon_timeline fa-school"></i>
                      Studying
                    </span>
                    {updatedschool?.school
                      ? updatedschool?.school
                      : "No Information"}{" "}
                  </div>
                  <div class="about_div_comp">
                    <span>
                      <i class="fas icon_timeline fa-briefcase"></i>
                      Profession
                    </span>
                    {updatedwork?.work ? updatedwork?.work : "No Information"}
                  </div>
                  <div class="about_div_comp">
                    <span>
                      <i class="fas icon_timeline fa-location-arrow"></i>
                      Current Location
                    </span>
                    {updatedlocation?.location
                      ? updatedlocation?.location
                      : "No Information"}{" "}
                  </div>
                </form>{" "}
              </div>
            </div>
          </span>
          <span class="timeline_people_option">
            Friends
            <div class="info_dropdown info_dropdown_friends ">
              <div class="about_div_main">
                <div class="about_div_left">
                  <div clss="friends_following">
                    {" "}
                    <div class="about_div_comp about_div_comp_head">
                      {following.length} Following
                    </div>{" "}
                    {following.map(
                      ({
                        followingid,
                        followingdata: {
                          userPhoto,
                          user_name,
                          userEmail,
                          userId,
                        },
                      }) => (
                        <div key={followingid} class=" time_people people">
                          <img
                            height="50px"
                            width="50px"
                            class="people_user_img"
                            alt=""
                            src={userPhoto}
                          />
                          <div class="time_people_name follow_name">
                            {user_name}
                            <div class="time_people_name follow_buttons">
                              {" "}
                              <div id={userId} class="followbutton">
                                View Profile
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div class="about_div_right">
                  {" "}
                  <div class="friends_following">
                    {" "}
                    <div class="about_div_comp about_div_comp_head">
                      {followers.length} Followers
                    </div>
                    {followers.map(
                      ({
                        followersid,
                        followersdata: {
                          userPhoto,
                          user_name,
                          userEmail,
                          userId,
                          isFollowing,
                        },
                      }) => (
                        <div key={followersid} class="time_people people">
                          <img
                            height="50px"
                            width="50px"
                            class="people_user_img"
                            alt=""
                            src={userPhoto}
                          />
                          <div class="time_people_name follow_name">
                            {user_name}
                            <div class="time_people_name follow_buttons">
                              {" "}
                              <div id={userId} class="followbutton">
                                View Profile
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>{" "}
              </div>
            </div>
          </span>
          <span class="timeline_people_option">Photos</span>{" "}
          <div
            onClick={(e) => {
              db.collection("chats")
                .doc(tokens + "+" + user?.uid)
                .set({
                  userName: user?.displayName,
                });
              db.collection("chats")
                .doc(user?.uid + "+" + tokens)
                .set({
                  userName: user?.displayName,
                })
                .then(() => {
                  history.push(
                    `/Facebook/Messenger/${user?.uid + "+" + tokens}`
                  );
                });
            }}
            id="hey"
            class="followbutton"
          >
            Message
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friends;
