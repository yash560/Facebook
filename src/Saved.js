import React, { useEffect, useState } from "react";
import db from "./firebase";
import "./Friends.css";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import "./media.css";
import Posts from "./Mains/Posts";

function Saved() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [saved, setsaved] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .collection("saved")
      .onSnapshot((snap) =>
        setsaved(
          snap.docs.map((doc) => ({
            savedid: doc.id,
            savedData: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <div className="friends">
      <div class="friends_left">
        <span class="text_friends">
          {saved[0] ? "Saved Posts" : "No Saved Posts"}{" "}
          <i class="fas fa-cog"></i>
        </span>
        {/* <div class="people">
          <img height="50px" width="50px" class="people_user_img" alt="" />
          <div class="follow_name">
            <div class="follow_buttons">
              <div id="hey" class="followbutton">
                FOLLOW
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div class="friends_right">
        {saved[0]
          ? saved.map(
              ({
                savedid,
                savedData: {
                  postTimestamp,
                  postUserName,
                  post_text,
                  imagepost,
                  userImage,
                },
              }) => (
                <>
                  <Posts
                    postTimestamp={postTimestamp}
                    postId={savedid}
                    key={savedid}
                    userImage={userImage}
                    postUserName={postUserName}
                    post_text={post_text}
                    imagepost={imagepost}
                  />{" "}
                </>
              )
            )
          : " "}
      </div>
    </div>
  );
}

export default Saved;
