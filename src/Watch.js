import "./App.css";
import Header from "./Mains/Header";
import Left from "./Mains/Left";
import Posts from "./Mains/Posts";
import "./media.css";
import "./Mains/Center.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import db, { storage } from "./firebase";
import { useEffect, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
function Watch() {
  const [{ user }, dispatch] = useStateValue();

  const history = useHistory();
  const [id, setid] = useState([]);
  const [post, setpost] = useState(null);
  const [post_text, setpost_text] = useState([]);
  const [Watch, setWatch] = useState([]);
  const [privateWatch, setprivateWatch] = useState([]);
  const [Story, setStory] = useState([]);
  console.log(Story);
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
    db.collection("users")
      .doc(user?.uid)
      .collection("Watch")
      .orderBy("postTimestamp", "desc")
      .onSnapshot((snap) => {
        setprivateWatch(
          snap.docs.map((doc) => ({
            postId: doc.id,
            postData: doc.data(),
          }))
        );
      });
    db.collection("Watch")
      .orderBy("postTimestamp", "desc")
      .onSnapshot((snap) => {
        setWatch(
          snap.docs.map((doc) => ({
            postId: doc.id,
            postData: doc.data(),
          }))
        );
      });
    db.collection("users")
      .doc(user?.uid)
      .onSnapshot((snap) => setid(snap.id));

    db.collection("users").doc(user?.uid).set({
      userPhoto: user?.photoURL,
      userId: user?.uid,
      userEmail: user?.email,
      user_name: user?.displayName,

      userphone: user?.phoneNumber,
    });
  }, []);
  console.log(Story[0]?.storydata?.Story_Image);
  return (
    <>
      {user ? (
        <>
          <Header />
          <div className="App">
            <Left />
            <div class="center">
              <div class="start">
                {" "}
                <Link to="/Facebook/YourStory" class="stories">
                  <div className="storyup">
                    <img src={user?.photoURL} height="100%" width="100%" />
                  </div>
                  <div className="storydown">Create Story</div>
                </Link>
                {Story[0] ? (
                  Story[4] ? (
                    <>
                      <div class="stories">
                        <img
                          src={Story[0]?.storydata?.Story_Image}
                          height="100%"
                          width="100%"
                        />
                        <div class="user_story">
                          <img
                            class="user_story_image"
                            src={Story[0]?.storydata?.storyUserPhoto}
                            alt=""
                            height="30px"
                          />
                        </div>
                      </div>
                      <div class="stories">
                        <img
                          src={Story[1]?.storydata?.Story_Image}
                          height="100%"
                          width="100%"
                        />
                        <div class="user_story">
                          <img
                            class="user_story_image"
                            src={Story[1]?.storydata?.storyUserPhoto}
                            alt=""
                            height="30px"
                          />
                        </div>
                      </div>
                      <div class="stories">
                        <img
                          src={Story[2]?.storydata?.Story_Image}
                          height="100%"
                          width="100%"
                        />
                        <div class="user_story">
                          <img
                            class="user_story_image"
                            src={Story[2]?.storydata?.storyUserPhoto}
                            alt=""
                            height="30px"
                          />
                        </div>
                      </div>
                      <div class="stories">
                        <img
                          src={Story[3]?.storydata?.Story_Image}
                          height="100%"
                          width="100%"
                        />
                        <div class="user_story">
                          <img
                            class="user_story_image"
                            src={Story[3]?.storydata?.storyUserPhoto}
                            alt=""
                            height="30px"
                          />
                        </div>{" "}
                        <Link to="/Facebook/AllStory" className="viewMoreStory">
                          <i className="fa fa-arrow-right"></i>{" "}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      {Story.map(
                        ({
                          storyid,
                          storydata: {
                            Story_Image,
                            storyname,
                            storyUserPhoto,
                            storytime,
                          },
                        }) => (
                          <>
                            <div className="none">
                              {Story[0]
                                ? setTimeout(() => {
                                    db.collection("users")
                                      .doc(user?.uid)
                                      .collection("Story")
                                      .doc(storyid)
                                      .delete();
                                  }, 60000)
                                : " "}
                            </div>{" "}
                            <div class="stories">
                              <img
                                src={Story_Image}
                                height="100%"
                                width="100%"
                              />
                              <div class="user_story">
                                <img
                                  class="user_story_image"
                                  src={storyUserPhoto}
                                  alt=""
                                  height="30px"
                                />
                              </div>
                            </div>
                          </>
                        )
                      )}
                    </>
                  )
                ) : (
                  <>
                    <div class="stories">
                      <div class="user_story">
                        <img
                          class="user_story_image"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEVCZ7L///+5w95GarM2YK80Xq+pttc+ZbFfe7s6YrCHmsmZqdA8Y7Ds8PdSdLlffr3V3OyQpNFrh8Lg5vIvW633+fyCmsxKb7fG0eier9WtutnAy+Ta4e91jsR8k8eMn8zP1ulvh8Dx9PkmVqvo7ff2SOu1AAAEYklEQVR4nO3da3uqOBSG4YDBmDYkHEStp1qn//83jqfuvWemoxGarBWu9/myP9XNfS0sIJGK7FpZ1Y0VY8k2dVXeZOL6T+6kNtTb9YMZLV3+h7B1cky8a0a69ktYWU29OUHStroKWzu+AV4ztr0I3TgneE67szCX1NsRMJlnonRj3UfPGVeKaswjPA2xEvV434XndC2aMe+kp920EeM5Vfu+sfsQQgghhBBCCCGEEPJJKWOM1lpKfc5cUkoo6g37mbQshG12+8XLe/1+6mWx3+8+GjezSyXnRXESq1SpyuhiPlmsq21bHrvudrc667ruWJafn227rQ6b9euisUWStySUFM3r6pfrfq/pEc18Oa2OfryzMLW7Lnry4Tu9JGeoin31DC+1GSrjDk/NL7UZmsn0aV9SM5R2+7wvoRmq4q3HABMSnoC9fMnspWqy6glMZIbKbPoCU5lhf2AaMyym/YFJzFDXA4ApzNA0/qfZSc5QyWfPRFOboR7yJkxBaNygfTSBvXTe+1CfyAyNGwjkPkOlhv2a4T9Ds+t3QZHODE0+FMh8hmo5eITMZygHna+lMEPZ63OLhITGlY8FD4Wc91LZ95OLfwgZz1ANufD9LWQ8Q2U/f0LIeIZm9gSk267y9Xo9/XfrD8bfFtELX95xs58tJ0rLb2IMFIXnCU05nRQmyRvbc7+jYTXTCeIuSa9r343ivB/eb+kjLJfpAk3jc9q9Y3wweJTZewhXyS4nEZ4XFu8Jj1Do18fA0iY8Qq/z7kNBvZVD8rkfM01aKNceb0PGFw6P8zlpS/tL2D7C2eiFSf8q9RIuqTdyUD7CCfVGDgpCCPkHIYT8gxBC/kEIIf8ghJB/EELIv1EI1Xc33r/6y0NoinuvcIr4E2Pl/rt24o88bnLf+/FLb7RE/fLYMLDP+diFK9pbNxGEa9o7qBGExKvaIghfxi7sdrQ3p8ILqR9FHl7YEt9+Cy+sJmMXHoiX24QX5sRrNcIL30Y/wz3xSobwQuq/WxFeSOuLIOxor50iCNvRCzfUC/uCC8mXLgYX1tQriIMLqQ+HwYUd+eLM0MLSUS9dDC3cki/ODC08EF8dhhduqN+GwYXEH5ZGENJ/BTiwsCM/HAYXkh8OQwuP9OvcQwupz7uDC7fUV4cn4XtQIfG9w3Nq6Wb/n/V4ZsS9n59x+LuG6l5zj5UKwtx5AWrdw0ax2uRuEELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8g/EEh0bMJogmtIHrMSyyhaURN8zCiWEJdi4rmgVKxhLISRA82jyQ0rhRZTjLESEKZZyLrHMU7MY5Qu+wkzFpLsJ9GERrbXoRZZeNPMYZQ2yq7CrPWydhjDC800rXZlzDrcid1VGRgodHS3f4HcXu1sqqbmCdwYYW2qavy9ip/A3YKUMidEST2AAAAAElFTkSuQmCC"
                          alt=""
                          height="30px"
                        />
                      </div>
                    </div>
                    <div class="stories">
                      <div class="user_story">
                        <img
                          class="user_story_image"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEVCZ7L///+5w95GarM2YK80Xq+pttc+ZbFfe7s6YrCHmsmZqdA8Y7Ds8PdSdLlffr3V3OyQpNFrh8Lg5vIvW633+fyCmsxKb7fG0eier9WtutnAy+Ta4e91jsR8k8eMn8zP1ulvh8Dx9PkmVqvo7ff2SOu1AAAEYklEQVR4nO3da3uqOBSG4YDBmDYkHEStp1qn//83jqfuvWemoxGarBWu9/myP9XNfS0sIJGK7FpZ1Y0VY8k2dVXeZOL6T+6kNtTb9YMZLV3+h7B1cky8a0a69ktYWU29OUHStroKWzu+AV4ztr0I3TgneE67szCX1NsRMJlnonRj3UfPGVeKaswjPA2xEvV434XndC2aMe+kp920EeM5Vfu+sfsQQgghhBBCCCGEEPJJKWOM1lpKfc5cUkoo6g37mbQshG12+8XLe/1+6mWx3+8+GjezSyXnRXESq1SpyuhiPlmsq21bHrvudrc667ruWJafn227rQ6b9euisUWStySUFM3r6pfrfq/pEc18Oa2OfryzMLW7Lnry4Tu9JGeoin31DC+1GSrjDk/NL7UZmsn0aV9SM5R2+7wvoRmq4q3HABMSnoC9fMnspWqy6glMZIbKbPoCU5lhf2AaMyym/YFJzFDXA4ApzNA0/qfZSc5QyWfPRFOboR7yJkxBaNygfTSBvXTe+1CfyAyNGwjkPkOlhv2a4T9Ds+t3QZHODE0+FMh8hmo5eITMZygHna+lMEPZ63OLhITGlY8FD4Wc91LZ95OLfwgZz1ANufD9LWQ8Q2U/f0LIeIZm9gSk267y9Xo9/XfrD8bfFtELX95xs58tJ0rLb2IMFIXnCU05nRQmyRvbc7+jYTXTCeIuSa9r343ivB/eb+kjLJfpAk3jc9q9Y3wweJTZewhXyS4nEZ4XFu8Jj1Do18fA0iY8Qq/z7kNBvZVD8rkfM01aKNceb0PGFw6P8zlpS/tL2D7C2eiFSf8q9RIuqTdyUD7CCfVGDgpCCPkHIYT8gxBC/kEIIf8ghJB/EELIv1EI1Xc33r/6y0NoinuvcIr4E2Pl/rt24o88bnLf+/FLb7RE/fLYMLDP+diFK9pbNxGEa9o7qBGExKvaIghfxi7sdrQ3p8ILqR9FHl7YEt9+Cy+sJmMXHoiX24QX5sRrNcIL30Y/wz3xSobwQuq/WxFeSOuLIOxor50iCNvRCzfUC/uCC8mXLgYX1tQriIMLqQ+HwYUd+eLM0MLSUS9dDC3cki/ODC08EF8dhhduqN+GwYXEH5ZGENJ/BTiwsCM/HAYXkh8OQwuP9OvcQwupz7uDC7fUV4cn4XtQIfG9w3Nq6Wb/n/V4ZsS9n59x+LuG6l5zj5UKwtx5AWrdw0ax2uRuEELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8g/EEh0bMJogmtIHrMSyyhaURN8zCiWEJdi4rmgVKxhLISRA82jyQ0rhRZTjLESEKZZyLrHMU7MY5Qu+wkzFpLsJ9GERrbXoRZZeNPMYZQ2yq7CrPWydhjDC800rXZlzDrcid1VGRgodHS3f4HcXu1sqqbmCdwYYW2qavy9ip/A3YKUMidEST2AAAAAElFTkSuQmCC"
                          alt=""
                          height="30px"
                        />
                      </div>
                    </div>
                    <div class="stories">
                      <div class="user_story">
                        <img
                          class="user_story_image"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEVCZ7L///+5w95GarM2YK80Xq+pttc+ZbFfe7s6YrCHmsmZqdA8Y7Ds8PdSdLlffr3V3OyQpNFrh8Lg5vIvW633+fyCmsxKb7fG0eier9WtutnAy+Ta4e91jsR8k8eMn8zP1ulvh8Dx9PkmVqvo7ff2SOu1AAAEYklEQVR4nO3da3uqOBSG4YDBmDYkHEStp1qn//83jqfuvWemoxGarBWu9/myP9XNfS0sIJGK7FpZ1Y0VY8k2dVXeZOL6T+6kNtTb9YMZLV3+h7B1cky8a0a69ktYWU29OUHStroKWzu+AV4ztr0I3TgneE67szCX1NsRMJlnonRj3UfPGVeKaswjPA2xEvV434XndC2aMe+kp920EeM5Vfu+sfsQQgghhBBCCCGEEPJJKWOM1lpKfc5cUkoo6g37mbQshG12+8XLe/1+6mWx3+8+GjezSyXnRXESq1SpyuhiPlmsq21bHrvudrc667ruWJafn227rQ6b9euisUWStySUFM3r6pfrfq/pEc18Oa2OfryzMLW7Lnry4Tu9JGeoin31DC+1GSrjDk/NL7UZmsn0aV9SM5R2+7wvoRmq4q3HABMSnoC9fMnspWqy6glMZIbKbPoCU5lhf2AaMyym/YFJzFDXA4ApzNA0/qfZSc5QyWfPRFOboR7yJkxBaNygfTSBvXTe+1CfyAyNGwjkPkOlhv2a4T9Ds+t3QZHODE0+FMh8hmo5eITMZygHna+lMEPZ63OLhITGlY8FD4Wc91LZ95OLfwgZz1ANufD9LWQ8Q2U/f0LIeIZm9gSk267y9Xo9/XfrD8bfFtELX95xs58tJ0rLb2IMFIXnCU05nRQmyRvbc7+jYTXTCeIuSa9r343ivB/eb+kjLJfpAk3jc9q9Y3wweJTZewhXyS4nEZ4XFu8Jj1Do18fA0iY8Qq/z7kNBvZVD8rkfM01aKNceb0PGFw6P8zlpS/tL2D7C2eiFSf8q9RIuqTdyUD7CCfVGDgpCCPkHIYT8gxBC/kEIIf8ghJB/EELIv1EI1Xc33r/6y0NoinuvcIr4E2Pl/rt24o88bnLf+/FLb7RE/fLYMLDP+diFK9pbNxGEa9o7qBGExKvaIghfxi7sdrQ3p8ILqR9FHl7YEt9+Cy+sJmMXHoiX24QX5sRrNcIL30Y/wz3xSobwQuq/WxFeSOuLIOxor50iCNvRCzfUC/uCC8mXLgYX1tQriIMLqQ+HwYUd+eLM0MLSUS9dDC3cki/ODC08EF8dhhduqN+GwYXEH5ZGENJ/BTiwsCM/HAYXkh8OQwuP9OvcQwupz7uDC7fUV4cn4XtQIfG9w3Nq6Wb/n/V4ZsS9n59x+LuG6l5zj5UKwtx5AWrdw0ax2uRuEELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8g/EEh0bMJogmtIHrMSyyhaURN8zCiWEJdi4rmgVKxhLISRA82jyQ0rhRZTjLESEKZZyLrHMU7MY5Qu+wkzFpLsJ9GERrbXoRZZeNPMYZQ2yq7CrPWydhjDC800rXZlzDrcid1VGRgodHS3f4HcXu1sqqbmCdwYYW2qavy9ip/A3YKUMidEST2AAAAAElFTkSuQmCC"
                          alt=""
                          height="30px"
                        />
                      </div>
                    </div>
                    <div class="stories">
                      <div class="user_story">
                        <img
                          class="user_story_image"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEVCZ7L///+5w95GarM2YK80Xq+pttc+ZbFfe7s6YrCHmsmZqdA8Y7Ds8PdSdLlffr3V3OyQpNFrh8Lg5vIvW633+fyCmsxKb7fG0eier9WtutnAy+Ta4e91jsR8k8eMn8zP1ulvh8Dx9PkmVqvo7ff2SOu1AAAEYklEQVR4nO3da3uqOBSG4YDBmDYkHEStp1qn//83jqfuvWemoxGarBWu9/myP9XNfS0sIJGK7FpZ1Y0VY8k2dVXeZOL6T+6kNtTb9YMZLV3+h7B1cky8a0a69ktYWU29OUHStroKWzu+AV4ztr0I3TgneE67szCX1NsRMJlnonRj3UfPGVeKaswjPA2xEvV434XndC2aMe+kp920EeM5Vfu+sfsQQgghhBBCCCGEEPJJKWOM1lpKfc5cUkoo6g37mbQshG12+8XLe/1+6mWx3+8+GjezSyXnRXESq1SpyuhiPlmsq21bHrvudrc667ruWJafn227rQ6b9euisUWStySUFM3r6pfrfq/pEc18Oa2OfryzMLW7Lnry4Tu9JGeoin31DC+1GSrjDk/NL7UZmsn0aV9SM5R2+7wvoRmq4q3HABMSnoC9fMnspWqy6glMZIbKbPoCU5lhf2AaMyym/YFJzFDXA4ApzNA0/qfZSc5QyWfPRFOboR7yJkxBaNygfTSBvXTe+1CfyAyNGwjkPkOlhv2a4T9Ds+t3QZHODE0+FMh8hmo5eITMZygHna+lMEPZ63OLhITGlY8FD4Wc91LZ95OLfwgZz1ANufD9LWQ8Q2U/f0LIeIZm9gSk267y9Xo9/XfrD8bfFtELX95xs58tJ0rLb2IMFIXnCU05nRQmyRvbc7+jYTXTCeIuSa9r343ivB/eb+kjLJfpAk3jc9q9Y3wweJTZewhXyS4nEZ4XFu8Jj1Do18fA0iY8Qq/z7kNBvZVD8rkfM01aKNceb0PGFw6P8zlpS/tL2D7C2eiFSf8q9RIuqTdyUD7CCfVGDgpCCPkHIYT8gxBC/kEIIf8ghJB/EELIv1EI1Xc33r/6y0NoinuvcIr4E2Pl/rt24o88bnLf+/FLb7RE/fLYMLDP+diFK9pbNxGEa9o7qBGExKvaIghfxi7sdrQ3p8ILqR9FHl7YEt9+Cy+sJmMXHoiX24QX5sRrNcIL30Y/wz3xSobwQuq/WxFeSOuLIOxor50iCNvRCzfUC/uCC8mXLgYX1tQriIMLqQ+HwYUd+eLM0MLSUS9dDC3cki/ODC08EF8dhhduqN+GwYXEH5ZGENJ/BTiwsCM/HAYXkh8OQwuP9OvcQwupz7uDC7fUV4cn4XtQIfG9w3Nq6Wb/n/V4ZsS9n59x+LuG6l5zj5UKwtx5AWrdw0ax2uRuEELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8g/EEh0bMJogmtIHrMSyyhaURN8zCiWEJdi4rmgVKxhLISRA82jyQ0rhRZTjLESEKZZyLrHMU7MY5Qu+wkzFpLsJ9GERrbXoRZZeNPMYZQ2yq7CrPWydhjDC800rXZlzDrcid1VGRgodHS3f4HcXu1sqqbmCdwYYW2qavy9ip/A3YKUMidEST2AAAAAElFTkSuQmCC"
                          alt=""
                          height="30px"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <form class="create_post">
                <div class="create_post_columns">
                  {" "}
                  <div
                    type="button "
                    data-toggle="modal"
                    data-target="#exampleModal"
                    class="create_post_icons"
                  >
                    Upload A Reel
                  </div>
                  <div
                    type="button "
                    data-toggle="modal"
                    data-target="#exampleModal"
                    class="create_post_icons"
                  >
                    <i class="fab create_post_icon video fa-youtube"></i>
                    Upload
                  </div>
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
                        <div class="modal-body">
                          <input
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                setpost(e.target.files[0]);
                              }
                            }}
                            type="file"
                            accept="video/*"
                          />
                        </div>
                        <div class="modal-footer">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              const upload = storage
                                .ref(`images/${post.name}`)
                                .put(post);
                              upload.on(
                                "state_changed",
                                (snapshot) => {},
                                (error) => {
                                  console.log(error);
                                },
                                () => {
                                  alert("Your Video Reel Is Live");

                                  storage
                                    .ref("images")
                                    .child(post.name)
                                    .getDownloadURL()
                                    .then((imageurl) => {
                                      db.collection("users")
                                        .doc(user?.uid)
                                        .collection("Watch")
                                        .add({
                                          imagepost: imageurl,
                                          post_text: post_text,
                                          userImage: user?.photoURL,
                                          postUserName: user?.displayName,
                                          postTimestamp:
                                            firebase.firestore.FieldValue.serverTimestamp(),
                                        });
                                      db.collection("Watch").add({
                                        imagepost: imageurl,
                                        post_text: post_text,
                                        userImage: user?.photoURL,
                                        postUserName: user?.displayName,
                                        postTimestamp:
                                          firebase.firestore.FieldValue.serverTimestamp(),
                                      });
                                    });
                                }
                              );
                              setpost_text(" ");
                              setpost(null);
                            }}
                            type="submit"
                            class="followbutton btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {Watch.map(
                ({
                  postId,
                  postData: {
                    postTimestamp,
                    postUserName,
                    post_text,
                    imagepost,
                    userImage,
                  },
                }) => (
                  <>
                    <Posts
                      postTimestamp={postTimestamp}
                      postId={postId}
                      key={postId}
                      userImage={userImage}
                      postUserName={postUserName}
                      post_text={post_text}
                      imagepost={imagepost}
                    />
                  </>
                )
              )}
            </div>
            <div class="right"></div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </>
  );
}

export default Watch;
