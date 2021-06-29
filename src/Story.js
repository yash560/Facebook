import React, { useEffect, useState } from "react";
import db, { storage } from "./firebase";
import "./Friends.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import "./media.css";
import firebase from "firebase";
import Posts from "./Mains/Posts";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
function Story() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [Story_Image, setStory_Image] = useState([]);
  const [Story, setStory] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .collection("Story")
      .onSnapshot((snap) =>
        setStory(
          snap.docs.map((doc) => ({
            storyid: doc.id,
            storydata: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <div className="friends">
      <div class="friends_left">
        <span class="text_friends">
          Your Story
          <i class="fas fa-cog"></i>
        </span>
        <div class="people">
          <img
            height="50px"
            src={user?.photoURL}
            width="50px"
            class="people_user_img"
          />
          <div class="follow_name">
            {user?.displayName}
            <div class="follow_buttons">
              <Link to="/Facebook/Timeline" id="hey" class="followbutton">
                TimeLine
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div class="friends_right storyRight">
        <div class="storyaddCard blustoryaddCard">
          {Story[4] ? (
            "Max Limit reached"
          ) : (
            <>
              <div class="itemstory ">
                <PhotoLibraryIcon />
              </div>
              <input
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setStory_Image(e.target.files[0]);
                  }
                }}
                type="file"
                accept="image/*"
                className="filesStory "
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const upload = storage
                    .ref(`images/${Story_Image.name}`)
                    .put(Story_Image);
                  upload.on(
                    "state_changed",
                    (snapshot) => {},
                    (error) => {
                      console.log(error);
                    },
                    () => {
                      alert("Your Story Is Live For 10 Minutes");
                      storage
                        .ref("images")
                        .child(Story_Image.name)
                        .getDownloadURL()
                        .then((imageurl) => {
                          db.collection("users")
                            .doc(user?.uid)
                            .collection("Story")
                            .add({
                              Story_Image: imageurl,
                              storyname: user?.displayName,
                              storyUserPhoto: user?.photoURL,
                              storytime:
                                firebase.firestore.FieldValue.serverTimestamp(),
                            });
                        });
                    }
                  );
                }}
                className="followbutton"
                type="submit"
              >
                POST
              </button>
            </>
          )}
        </div>
        <div class="storyaddCard">
          {" "}
          {Story[4] ? (
            " Post After 1 Hour "
          ) : (
            <>
              {" "}
              <div class="itemstory">Aa</div>
              Text Story{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Story;
