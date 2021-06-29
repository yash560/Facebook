import React from "react";
import "./Header.css";
import { useStateValue } from "../StateProvider";
import { auth, provider } from "../firebase";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  const logout = () => {
    auth
      .signOut()
      .then((data) => history.push("/"))
      .catch((error) => alert(error.message));
  };
  var token = window.location.pathname;
  return (
    <>
      {user ? (
        <div>
          <div className="header">
            <div className="header_left">
              <img
                className="header_logo"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEVCZ7L///+5w95GarM2YK80Xq+pttc+ZbFfe7s6YrCHmsmZqdA8Y7Ds8PdSdLlffr3V3OyQpNFrh8Lg5vIvW633+fyCmsxKb7fG0eier9WtutnAy+Ta4e91jsR8k8eMn8zP1ulvh8Dx9PkmVqvo7ff2SOu1AAAEYklEQVR4nO3da3uqOBSG4YDBmDYkHEStp1qn//83jqfuvWemoxGarBWu9/myP9XNfS0sIJGK7FpZ1Y0VY8k2dVXeZOL6T+6kNtTb9YMZLV3+h7B1cky8a0a69ktYWU29OUHStroKWzu+AV4ztr0I3TgneE67szCX1NsRMJlnonRj3UfPGVeKaswjPA2xEvV434XndC2aMe+kp920EeM5Vfu+sfsQQgghhBBCCCGEEPJJKWOM1lpKfc5cUkoo6g37mbQshG12+8XLe/1+6mWx3+8+GjezSyXnRXESq1SpyuhiPlmsq21bHrvudrc667ruWJafn227rQ6b9euisUWStySUFM3r6pfrfq/pEc18Oa2OfryzMLW7Lnry4Tu9JGeoin31DC+1GSrjDk/NL7UZmsn0aV9SM5R2+7wvoRmq4q3HABMSnoC9fMnspWqy6glMZIbKbPoCU5lhf2AaMyym/YFJzFDXA4ApzNA0/qfZSc5QyWfPRFOboR7yJkxBaNygfTSBvXTe+1CfyAyNGwjkPkOlhv2a4T9Ds+t3QZHODE0+FMh8hmo5eITMZygHna+lMEPZ63OLhITGlY8FD4Wc91LZ95OLfwgZz1ANufD9LWQ8Q2U/f0LIeIZm9gSk267y9Xo9/XfrD8bfFtELX95xs58tJ0rLb2IMFIXnCU05nRQmyRvbc7+jYTXTCeIuSa9r343ivB/eb+kjLJfpAk3jc9q9Y3wweJTZewhXyS4nEZ4XFu8Jj1Do18fA0iY8Qq/z7kNBvZVD8rkfM01aKNceb0PGFw6P8zlpS/tL2D7C2eiFSf8q9RIuqTdyUD7CCfVGDgpCCPkHIYT8gxBC/kEIIf8ghJB/EELIv1EI1Xc33r/6y0NoinuvcIr4E2Pl/rt24o88bnLf+/FLb7RE/fLYMLDP+diFK9pbNxGEa9o7qBGExKvaIghfxi7sdrQ3p8ILqR9FHl7YEt9+Cy+sJmMXHoiX24QX5sRrNcIL30Y/wz3xSobwQuq/WxFeSOuLIOxor50iCNvRCzfUC/uCC8mXLgYX1tQriIMLqQ+HwYUd+eLM0MLSUS9dDC3cki/ODC08EF8dhhduqN+GwYXEH5ZGENJ/BTiwsCM/HAYXkh8OQwuP9OvcQwupz7uDC7fUV4cn4XtQIfG9w3Nq6Wb/n/V4ZsS9n59x+LuG6l5zj5UKwtx5AWrdw0ax2uRuEELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8g/EEh0bMJogmtIHrMSyyhaURN8zCiWEJdi4rmgVKxhLISRA82jyQ0rhRZTjLESEKZZyLrHMU7MY5Qu+wkzFpLsJ9GERrbXoRZZeNPMYZQ2yq7CrPWydhjDC800rXZlzDrcid1VGRgodHS3f4HcXu1sqqbmCdwYYW2qavy9ip/A3YKUMidEST2AAAAAElFTkSuQmCC"
                alt=""
                height="50px"
              />
              <input
                placeholder="Search Facebook"
                className="header_search"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="header_Center">
              <Link
                to="/Facebook"
                className={
                  token == "/Facebook"
                    ? "active_header_class"
                    : "header_Center_icons"
                }
              >
                <i className="fas fa-home"></i>
              </Link>
              <Link
                to="/Facebook/Watch"
                className={
                  token == "/Facebook/Watch"
                    ? "active_header_class"
                    : "header_Center_icons"
                }
              >
                <i className="fab fa-youtube"></i>{" "}
              </Link>
              <Link
                to="/Facebook/MarketPlace/Home"
                className={
                  token == "/Facebook/MarketPlace/Home" ||
                  token == "/Facebook/MarketPlace/Cart" ||
                  token == "/Facebook/MarketPlace/List_Item" ||
                  token == "/Facebook/MarketPlace/Additem"
                    ? "active_header_class"
                    : "header_Center_icons"
                }
              >
                <i className="fas fa-store"></i>
              </Link>
              <div className="header_Center_icons">
                <i className="fas fa-users"></i>
              </div>
              <Link
                to="/Facebook/AllStory"
                className={
                  token == "/Facebook/AllStory"
                    ? "active_header_class"
                    : "header_Center_icons"
                }
              >
                <i className="far fa-window-restore"></i>
              </Link>
            </div>
            <div className="header_right">
              <Link
                to="/Facebook/Timeline"
                className="header_right_icons_user_img"
              >
                <img
                  className="header_user_image imageuser"
                  src={user?.photoURL}
                  alt=""
                  height="30px"
                />
                {user?.displayName}
              </Link>
              <Link to="/Facebook/YourStory" className="header_right_icons">
                <i className="fas fa-plus"></i>
              </Link>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  history.push(
                    `/Facebook/Messenger/${user?.uid + "+" + user?.uid}`
                  );
                }}
                className="header_right_icons"
              >
                <i className="far fa-comment-alt"></i>
              </div>
              <div className="header_right_icons">
                <i className="far fa-bell"></i>
              </div>
              <div className="header_right_icons account_dropdown">
                <i className="fas fa-sort-down"></i>
                <div className="acc">
                  <div class="left_component">
                    <div class="left_icon">
                      <img
                        className="header_user_image imageuser"
                        src={user?.photoURL}
                        alt=""
                        height="40px"
                      />
                    </div>
                    <span class="left_text">{user?.displayName}</span>
                  </div>
                  <div onClick={logout} class="left_component">
                    <div class="left_icon">
                      <i class="fas fa-clock"></i>
                    </div>
                    <span class="left_text">Logout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        history.push("/")
      )}
    </>
  );
}

export default Header;
