import React, { useEffect } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth, provider } from "../firebase";
function Login() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((users) => {
      if (users) {
        dispatch({
          type: "SET_USER",
          user: users,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  setTimeout(() => {
    if (user) {
      history.push("/Facebook");
    } else {
      history.push("/");
    }
  }, 1000);
  const history = useHistory();
  const signIn = () => {
    auth.signInWithPopup(provider).then((auth) => {
      history.push("/Home");
    });
  };
  return (
    <div className="login">
      <div className="content">
        <a
          href="https://accounts.google.com/signup/v2/webcreateaccount?hl=en&flowName=GlifWebSignIn&flowEntry=SignUp"
          class="login_comp  login_compmain"
        >
          <span class="facebook_text">facebook</span>
          <div class="addaccount">
            <div class="login_add">
              <div class="add_circle">+</div>
            </div>{" "}
            <div class="login_add_bottom">ADD ACCOUNT</div>
          </div>
        </a>{" "}
        <div class="login_comp">
          <div class="login_details">
            <input
              placeholder="Your Nick Name ..."
              class="login_input"
              type="text"
              name=""
              id=""
            />{" "}
            <input
              placeholder="Photo Url (Optional) ..."
              class="login_input"
              type="password"
              name=""
              id=""
            />
            <button onClick={signIn} class="login_button" href="">
              Log In
            </button>
          </div>
          Create a Page for a celebrity, band or business
        </div>
      </div>
    </div>
  );
}

export default Login;
