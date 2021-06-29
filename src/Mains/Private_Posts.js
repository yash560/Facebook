import React, { useEffect, useState } from "react";
import db from "../firebase";
import "../media.css";
import { useStateValue } from "../StateProvider";
import "./Posts.css";
import firebase from "firebase";
import Comment from "./Comment";

function Private_Posts({
  postTimestamp,
  postUserName,
  post_text,
  imagepost,
  userImage,
  postId,
}) {
  const [{ user }, dispatch] = useStateValue();
  const [liked, setliked] = useState([]);
  const [likes, setlikes] = useState([]);
  const [commentinput, setcommentinput] = useState([]);
  const [showComment, setshowComment] = useState([]);
  const [iscommentopen, setIscommentopen] = useState(false);

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

  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
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
  }, []);
  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("Likes")
      .onSnapshot((snap) => setlikes(snap.docs.map((doc) => doc.data())));
  }, [liked]);
  return (
    <div>
      <div key={postId} class="posts">
        <div class="posts_user_info">
          <img class="create_post_image" src={userImage} alt="" height="40px" />
          <div class="Posts_text_info">
            <span class="posts_name">{postUserName}</span>
            <span class="posts_time">
              {new Date(postTimestamp?.toDate()).toDateString()}
            </span>
          </div>
        </div>
        <div class="posts_text_message">{post_text}</div>
        <img class="posts_img" alt="" src={imagepost} />
        <video src={imagepost} />
      </div>
    </div>
  );
}

export default Private_Posts;
