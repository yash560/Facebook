import React, { useEffect, useRef, useState } from "react";
import db from "../firebase";
import "../media.css";
import { useStateValue } from "../StateProvider";
import "./Posts.css";
import firebase from "firebase";
import Comment from "./Comment";

function Posts({
  postTimestamp,
  postUserName,
  post_text,
  imagepost,
  userImage,
  postId,
}) {
  const [playing, setplaying] = useState(false);

  const videoRef = useRef(null);
  const playvideo = () => {
    if (playing) {
      videoRef.current.pause();
      setplaying(false);
    } else {
      videoRef.current.play();
      setplaying(true);
    }
    window.addEventListener("scroll", () => {
      videoRef.current.pause();
      setplaying(false);
    });
  };
  const [{ user }, dispatch] = useStateValue();
  const [liked, setliked] = useState([]);
  const [likes, setlikes] = useState([]);
  const [commentinput, setcommentinput] = useState([]);
  const [saved, setsaved] = useState([]);

  const [showComment, setshowComment] = useState([]);
  const [iscommentopen, setIscommentopen] = useState(false);
  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) =>
        setshowComment(
          snap.docs.map((doc) => ({
            comid: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("Likes")
      .doc(user?.uid)
      .onSnapshot((snap) => setliked(snap.data()));
    db.collection("users")
      .doc(user?.uid)
      .collection("saved")
      .doc(postId)
      .onSnapshot((snap) => setsaved(snap.data()));
  }, []);
  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("Likes")
      .onSnapshot((snap) => setlikes(snap.docs.map((doc) => doc.data())));
  }, [liked]);
  const sendcomment = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(user?.uid)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        comment: commentinput,
        photoURL: user?.photoURL,
        userName: user?.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    db.collection("posts").doc(postId).collection("comments").add({
      comment: commentinput,
      photoURL: user?.photoURL,
      userName: user?.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setcommentinput(" ");
  };

  return (
    <div>
      <div key={postId} class="posts">
        <div class="posts_user_info">
          <div className="postuser">
            <img
              class="create_post_image"
              src={userImage}
              alt=""
              height="40px"
            />
            <div class="Posts_text_info">
              <span class="posts_name">{postUserName}</span>
              <span class="posts_time">
                {new Date(postTimestamp?.toDate()).toDateString()}
              </span>
            </div>
          </div>
          <div className="post_options">
            {postUserName === user?.displayName ? (
              <i
                onClick={(e) => {
                  db.collection("users")
                    .doc(user?.uid)
                    .collection("posts")
                    .doc(postId)
                    .delete();
                  db.collection("posts").doc(postId).delete();
                }}
                className="fas fa-trash  "
              ></i>
            ) : (
              " "
            )}

            {saved ? (
              <i
                onClick={(e) => {
                  db.collection("users")
                    .doc(user?.uid)

                    .collection("saved")
                    .doc(postId)
                    .delete();
                }}
                className="fas fa-bookmark"
              ></i>
            ) : (
              <i
                onClick={(e) => {
                  db.collection("users")
                    .doc(user?.uid)

                    .collection("saved")
                    .doc(postId)
                    .set({
                      imagepost: imagepost,
                      post_text: post_text,
                      userImage: userImage,
                      postUserName: postUserName,
                      postTimestamp: postTimestamp,
                    });
                }}
                className="far fa-bookmark"
              ></i>
            )}
          </div>
        </div>
        <div class="posts_text_message">{post_text}</div>
        <img class="posts_img" alt="" src={imagepost} />
        <video
          autoPlay
          loop
          ref={videoRef}
          onClick={playvideo}
          src={imagepost}
        ></video>
        <div class="likes_info">
          <span className="likedInfo">
            {liked?.isLiked == true ? (
              <>Liked by You and {parseInt(likes.length) - 1} others </>
            ) : (
              likes.length + " Likes"
            )}
          </span>
          {liked?.isLiked == true ? (
            <div
              onClick={(e) => {
                db.collection("users")
                  .doc(user?.uid)
                  .collection("posts")
                  .doc(postId)
                  .collection("Likes")
                  .doc(user?.uid)
                  .delete();
                db.collection("posts")
                  .doc(postId)
                  .collection("Likes")
                  .doc(user?.uid)
                  .delete();
              }}
              class="likes_row"
            >
              <i class="fas postLike fa-thumbs-up"></i> Liked
            </div>
          ) : (
            <div
              onClick={(e) => {
                db.collection("users")
                  .doc(user?.uid)
                  .collection("posts")
                  .doc(postId)
                  .collection("Likes")
                  .doc(user?.uid)
                  .set({
                    isLiked: true,
                  });
                db.collection("posts")
                  .doc(postId)
                  .collection("Likes")
                  .doc(user?.uid)
                  .set({
                    isLiked: true,
                  });
              }}
              class="likes_row"
            >
              <i class="far postLike fa-thumbs-up"></i>
              Like
            </div>
          )}

          <div class="likes_row">
            <i class="far fa-comment-alt"></i> Comment
            <span className="commentInfo"> {showComment.length} Comments</span>
          </div>
        </div>
        <div class="commentbox">
          <form>
            <div className="userInput">
              <div class="post_image">
                <img className="userImage" height="40px" src={user?.photoURL} />
              </div>
              <input
                class="commentinput"
                value={commentinput}
                placeholder="Write a Comment ..."
                type="text"
                onChange={(e) => {
                  setcommentinput(e.target.value);
                }}
              />
              <button
                className="sendcomment"
                type="submit"
                disabled={!commentinput[0]}
                onClick={sendcomment}
              >
                Comment
              </button>
            </div>
            {showComment[0] ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIscommentopen(true);
                }}
                className="followbutton ShowCommentsbutton"
              >
                Comments
              </button>
            ) : (
              ""
            )}
            {showComment.map(
              ({ comid, data: { timestamp, comment, photoURL, userName } }) => (
                <Comment
                  postId={postId}
                  comid={comid}
                  key={comid}
                  oncomClose={(e) => {
                    e.preventDefault();
                    setIscommentopen(false);
                  }}
                  commentopen={iscommentopen}
                  timestamp={new Date(timestamp?.toDate()).toUTCString()}
                  comment={comment}
                  photoURL={photoURL}
                  userName={userName}
                />
              )
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Posts;
