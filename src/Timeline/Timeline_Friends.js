import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db, { storage } from "../firebase";
import { useStateValue } from "../StateProvider";
import "./Timeline.css";
import "./Timeline_About.css";
import "./Timeline_Friends.css";
import firebase from "firebase";

import "../media.css";
function Timeline_Friends() {
  const [Timeline_Image, setTimeline_Image] = useState(null);
  const [updatedimage, setupdatedimage] = useState([]);
  const [userData, setuserData] = useState([]);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);

  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .collection("data")
      .doc(user?.uid)
      .onSnapshot((snap) => {
        setupdatedimage(snap.data());
      });
    db.collection("users")
      .doc(user?.uid)
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
      .doc(user?.uid)
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
      .doc(user?.uid)
      .onSnapshot((snap) => {
        setuserData(snap.data());
      });
  }, []);
  console.log(followers);
  return (
    <div>
      {" "}
      <div class="timeline_main">
        <div class="img_people_container">
          {" "}
          <img className="timeline_image" alt="" src={updatedimage?.image} />
          <div class="timeline_people_user_image">
            <img
              className="timeline_people_image"
              class="people_user_img"
              alt=""
              src={userData?.userPhoto}
            />
          </div>
          {updatedimage?.image ? (
            <i class="far checked fa-check-circle"></i>
          ) : (
            <button
              type="button "
              class="choose_timeline_photo "
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Choose File
            </button>
          )}
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Choose File
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form class="modal-body">
                  <input
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        setTimeline_Image(e.target.files[0]);
                      }
                    }}
                    accept="image/*"
                    type="file"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const upload = storage
                        .ref(`images/${Timeline_Image.name}`)
                        .put(Timeline_Image);
                      upload.on(
                        "state_changed",
                        (snapshot) => {},
                        (error) => {
                          console.log(error);
                        },
                        () => {
                          alert("TimeLine Photo Uploaded");

                          storage
                            .ref("images")
                            .child(Timeline_Image.name)
                            .getDownloadURL()
                            .then((imageurl) => {
                              db.collection("users")
                                .doc(user?.uid)
                                .collection("data")
                                .doc(user?.uid)
                                .update({
                                  image: imageurl,
                                });
                              db.collection("users")
                                .doc(user?.uid)
                                .collection("posts")
                                .add({
                                  imagepost: imageurl,
                                  post_text: "Timeine Picture Uploaded",
                                  userImage: user?.photoURL,
                                  postUserName: user?.displayName,
                                  postTimestamp:
                                    firebase.firestore.FieldValue.serverTimestamp(),
                                });
                              db.collection("posts").add({
                                imagepost: imageurl,
                                post_text: "Timeine Picture Uploaded",
                                userImage: user?.photoURL,
                                postUserName: user?.displayName,
                                postTimestamp:
                                  firebase.firestore.FieldValue.serverTimestamp(),
                              });
                            });
                        }
                      );
                    }}
                    className="folowbutton"
                    type="submit"
                  >
                    submit
                  </button>
                </form>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="timeline_people_option_conatainer">
          <Link to="/Facebook/Timeline_Posts" class="timeline_people_option">
            Posts
          </Link>{" "}
          <Link
            to="/Facebook/Timeline_About"
            class="timeline_people_option container_timeline"
          >
            About
          </Link>
          <Link to="/Facebook/Timeline_Friends" class="timeline_people_option">
            Friends
          </Link>
          <span class="timeline_people_option">Photos</span>
        </div>
        <div class="about_div">
          <div class="friendsMain">
            <div class="friends_following">
              {" "}
              <div class="about_div_comp about_div_comp_head">
                Followers ( {followers.length} )
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
            <div clss="friends_following">
              {" "}
              <div class="about_div_comp about_div_comp_head">
                Following ( {following.length} )
              </div>{" "}
              {following.map(
                ({
                  followingid,
                  followingdata: { userPhoto, user_name, userEmail, userId },
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
        </div>{" "}
      </div>
    </div>
  );
}

export default Timeline_Friends;
