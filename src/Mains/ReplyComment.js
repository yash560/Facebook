import React, { useEffect, useState } from "react";
import db from "../firebase";
import firebase from "firebase";

import { useStateValue } from "../StateProvider";
import Reply from "./Reply";
function ReplyComment({
  postId,
  comid,
  open,
  onClose,
  comment,
  photoURL,
  userName,
}) {
  const [{ user }, dispatch] = useStateValue();
  const [replycommentinput, replysetcommentinput] = useState([]);
  const [ShowReply, setShowReply] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(comid)
      .collection("reply")
      .orderBy("time", "desc")
      .onSnapshot((snap) =>
        setShowReply(
          snap.docs.map((doc) => ({
            repid: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  const sendreplycomment = (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(user?.uid)
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(comid)
      .collection("reply")
      .add({
        name: user?.displayName,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        replycomment: replycommentinput,
        photo: user?.photoURL,
      });
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(comid)
      .collection("reply")
      .add({
        name: user?.displayName,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        replycomment: replycommentinput,
        photo: user?.photoURL,
      });
    replysetcommentinput(" ");
  };
  console.log(ShowReply);
  if (!open) return false;

  return (
    <form>
      <div className="replybox">
        <div className="repyinputbox">
          <img className="userImage" height="50px" src={user?.photoURL} />
          <input
            class="commentinput"
            value={replycommentinput}
            placeholder="Reply To this Comment"
            type="text"
            onChange={(e) => {
              replysetcommentinput(e.target.value);
            }}
          />
          <button
            disabled={!replycommentinput[0]}
            className="sendreplucomment"
            type="submit"
            onClick={sendreplycomment}
          >
            Reply
          </button>
        </div>{" "}
        <span className="replylength">{ShowReply.length} Replies</span>
        {ShowReply.map(
          ({ repid, data: { replycomment, name, time, photo } }) => (
            <Reply
              postId={postId}
              repid={repid}
              replycomment={replycomment}
              name={name}
              comid={comid}
              photo={photo}
              time={new Date(time?.toDate()).toUTCString()}
            />
          )
        )}
        <button className="replyClose" onClick={onClose}>
          x
        </button>
      </div>
    </form>
  );
}

export default ReplyComment;
