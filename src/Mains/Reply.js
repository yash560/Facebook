import React from "react";
import { useStateValue } from "../StateProvider";
import db from "../firebase";
import firebase from "firebase";

function Reply({ postId, comid, replycomment, repid, name, time, photo }) {
  const [{ user }, dispatch] = useStateValue();

  const deletereply = () => {
    if (name === user?.displayName) {
      db.collection("users")
        .doc(user?.uid)
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(comid)
        .collection("reply")
        .doc(repid)
        .delete();
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(comid)
        .collection("reply")
        .doc(repid)
        .delete();
    }
  };
  return (
    <div>
      <div class="commentreplybox">
        <div className="userInput usercomment">
          <div className="commentuserInfo">
            <div className="commentuserImage">
              <img className="commenteduserImage" height="30px" src={photo} />
            </div>
            <p className="commentuserName">
              {name}
              <p className="commentuserTime">{time}</p>
            </p>
          </div>
          {name === user?.displayName ? (
            <i
              onClick={deletereply}
              class="fas post_dots replydel fa-trash"
            ></i>
          ) : (
            " "
          )}
        </div>
        <p className="comment">{replycomment} </p>
      </div>
    </div>
  );
}

export default Reply;
