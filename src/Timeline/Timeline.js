import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db, { storage } from "../firebase";
import { useStateValue } from "../StateProvider";
import "./Timeline.css";
import "../media.css";
import firebase from "firebase";
function Timeline() {
  const [Timeline_Image, setTimeline_Image] = useState(null);
  const [updatedimage, setupdatedimage] = useState([]);
  const [userData, setuserData] = useState([]);

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
      .onSnapshot((snap) => {
        setuserData(snap.data());
      });
  }, []);
  console.log(updatedimage);
  return (
    <div>
      <div class="timeline_main">
        <div class="img_people_container">
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
                                .set({
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
                    className="followbutton"
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
          </Link>
          <Link to="/Facebook/Timeline_About" class="timeline_people_option">
            About
          </Link>
          <Link to="/Facebook/Timeline_Friends" class="timeline_people_option">
            Friends
          </Link>
          <span class="timeline_people_option">Photos</span>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
