import React, { useState } from "react";
import ReplyComment from "./ReplyComment";
import { useStateValue } from "../StateProvider";
import db from "../firebase";
import firebase from "firebase";

function Comment({
  comid,
  postId,
  timestamp,
  comment,
  oncomClose,
  commentopen,
  photoURL,
  userName,
}) {
  const [{ user }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const deleteComment = () => {
    if (userName === user?.displayName) {
      db.collection("users")
        .doc(user?.uid)
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(comid)
        .delete();
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(comid)
        .delete();
    }
  };
  if (!commentopen) return false;

  return (
    <div>
      <div class="commentbox">
        <div className="userInput usercomment">
          {" "}
          <div className="commentuserInfo">
            <div className="commentuserImage">
              <img
                className="commenteduserImage"
                height="30px"
                src={photoURL}
              />
            </div>
            <p className="commentuserName">
              {userName} <p className="commentuserTime">{timestamp}</p>
            </p>{" "}
          </div>
          {userName === user?.displayName ? (
            <i onClick={deleteComment} class="fas post_dots fa-trash"></i>
          ) : (
            " "
          )}
        </div>
        <p className="comment">
          {comment}
          <p
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
            className="followbutton"
          >
            Reply
          </p>{" "}
        </p>
        <ReplyComment
          postId={postId}
          comid={comid}
          open={isOpen}
          onClose={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        />{" "}
        <button className="replyClose" onClick={oncomClose}>
          x
        </button>
      </div>
    </div>
  );
}

export default Comment;
