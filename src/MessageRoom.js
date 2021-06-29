import React, { useEffect, useState } from "react";
import db from "./firebase";
import "./Friends.css";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router-dom";
import "./media.css";
import "./MessageRoom.css";
import firebase from "firebase";

function MessageRoom() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [User_details, setUser_details] = useState([]);
  const [message_inp, setmessage_inp] = useState([]);
  const [displayMessages, setdisplayMessages] = useState([]);
  const [Following, setFollowing] = useState([]);
  const [reciever, setrecieve] = useState(
    window.location.pathname.split("+").slice(1).toLocaleString()
  );

  setInterval(() => {
    var reciever = window.location.pathname
      .split("+")
      .slice(1)
      .toLocaleString();
  }, 1000);
  useEffect(() => {
    db.collection("users")
      .doc(reciever)
      .onSnapshot((snap) => setUser_details(snap.data()));
    db.collection("chats")
      .doc(user?.uid + "+" + reciever)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) =>
        setdisplayMessages(
          snap.docs.map((doc) => ({
            messageId: doc.id,
            mesageData: doc.data(),
          }))
        )
      );

    db.collection("users")
      .doc(user?.uid)
      .collection("following")
      .onSnapshot((snap) =>
        setFollowing(
          snap.docs.map((doc) => ({
            fid: doc.id,
            fdata: doc.data(),
          }))
        )
      );
  }, [reciever]);

  return (
    <div className="friends messenger">
      <div class="friends_left messenger_left">
        <span class="text_friends">
          Your Following<i class="fas fa-cog"></i>
        </span>
        {Following.map(({ fid, fdata: { user_name, userPhoto, userId } }) => (
          <div
            onClick={(e) => {
              history.push(`/Facebook/Messenger/${user?.uid + "+" + userId}`);
              setrecieve(
                window.location.pathname.split("+").slice(1).toLocaleString()
              );
            }}
            class="people message_people"
          >
            <img
              height="50px"
              src={userPhoto}
              width="50px"
              class="people_user_img"
              alt=""
            />
            <div class="follow_name">
              {user_name}{" "}
              {/* <div class="follow_buttons">
              <div id="hey" class="followbutton">
                FOLLOW
              </div>
            </div> */}
            </div>
          </div>
        ))}
      </div>
      <div class="friends_right">
        <div class="messenger_header">
          <div class="messenger_header_comp">
            {window.location.pathname ==
            `/Facebook/Messenger/${user?.uid}+${user?.uid}` ? (
              <div class="follow_name">Select a Chat To Continue </div>
            ) : (
              <>
                {" "}
                <img
                  height="50px"
                  src={User_details?.userPhoto}
                  width="50px"
                  class="people_user_img"
                  alt=""
                />
                <div class="follow_name">{User_details?.user_name} </div>
              </>
            )}
          </div>
          <div class="messenger_header_comp">
            <i class="fas fa-info-circle"></i>
          </div>
        </div>{" "}
        <div class="message_container">
          {displayMessages.map(
            ({
              messageId,
              mesageData: { message, user_photo, timestamp, user_name },
            }) => (
              <div
                id={messageId}
                class={
                  user_name == user?.displayName
                    ? "message_sender"
                    : "message_reciever"
                }
              >
                <div
                  class={
                    user_name == user?.displayName
                      ? "message_senderInner"
                      : "message_recInner"
                  }
                >
                  {" "}
                  {message}
                </div>
                {user_name == user?.displayName ? (
                  " "
                ) : (
                  <div class="photoUrl">
                    {" "}
                    <img
                      height="30px"
                      src={user_photo}
                      width="30px"
                      class="people_user_img"
                      alt=""
                    />
                  </div>
                )}
                {user_name == user?.displayName ? (
                  " "
                ) : (
                  <div class="message_time">
                    {new Date(timestamp?.toDate()).toLocaleTimeString()}
                  </div>
                )}
              </div>
            )
          )}
        </div>
        <form class="messenger_footer">
          <input
            type="text"
            placeholder="Aa.."
            class="input_message"
            name=""
            id=""
            value={message_inp}
            onChange={(e) => {
              setmessage_inp(e.target.value);
            }}
          />{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              db.collection("chats")
                .doc(reciever + "+" + user?.uid)
                .collection("messages")
                .add({
                  message: message_inp,
                  user_name: user?.displayName,
                  user_photo: user?.photoURL,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
              db.collection("chats")
                .doc(user?.uid + "+" + reciever)
                .collection("messages")
                .add({
                  message: message_inp,
                  user_name: user?.displayName,
                  user_photo: user?.photoURL,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
              setmessage_inp(" ");
            }}
            class="followbutton"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default MessageRoom;
