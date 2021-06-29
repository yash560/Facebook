import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./StateProvider";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./Mains/Login";
import reducer, { initialState } from "./reducer";
import Friends from "./Friends";
import Header from "./Mains/Header";
import Timeline from "./Timeline/Timeline";
import Timeline_About from "./Timeline/Timeline_About";
import Timeline_Friends from "./Timeline/Timeline_Friends";
import Timeline_Posts from "./Timeline/Timeline_Posts";
import Saved from "./Saved";
import Story from "./Story";
import AllStory from "./AllStory";
import Watch from "./Watch";
import MessageRoom from "./MessageRoom";
import Market from "./Marketplace/Market";
import ListItem from "./Marketplace/ListItem";
import Additem from "./Marketplace/Additem";
import Item from "./Marketplace/Item";
import My_listings from "./Marketplace/My_listings";
import Cart from "./Marketplace/Cart";
import Order_History from "./Marketplace/Order_History";
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/Facebook">
            <App />
          </Route>
          <Route exact path="/Facebook/friends">
            <Header />
            <Friends />
          </Route>
          <Route exact path="/Facebook/Watch">
            <Watch />
          </Route>
          <Route path="/Facebook/Messenger/">
            <Header />
            <MessageRoom />
          </Route>
          <Route path="/Facebook/friends/">
            <Header />
            <Friends />
          </Route>
          <Route path="/Facebook/Timeline">
            <Header /> <Timeline />
          </Route>
          <Route path="/Facebook/Timeline_About">
            <Header /> <Timeline_About />
          </Route>
          <Route path="/Facebook/Timeline_Posts">
            <Header /> <Timeline_Posts />
          </Route>
          <Route path="/Facebook/Timeline_Friends">
            <Header /> <Timeline_Friends />
          </Route>
          <Route path="/Facebook/Saved">
            <Header />
            <Saved />
          </Route>
          <Route path="/Facebook/YourStory">
            <Header />
            <Story />
          </Route>
          <Route path="/Facebook/AllStory">
            <AllStory />
          </Route>
          <Route exact path="/Facebook/MarketPlace/Home">
            <Header />
            <Market />
          </Route>
          <Route exact path="/Facebook/MarketPlace/List_Item">
            <Header />
            <ListItem />
          </Route>
          <Route exact path="/Facebook/MarketPlace/Additem">
            <Header />
            <Additem />
          </Route>
          <Route exact path="/Facebook/MarketPlace/My_listings">
            <Header />
            <My_listings />
          </Route>
          <Route path="/Facebook/MarketPlace/Listings/">
            <Item />
          </Route>
          <Route exact path="/Facebook/MarketPlace/Cart">
            <Header />
            <Cart />
          </Route>
          <Route exact path="/Facebook/MarketPlace/Order_History">
            <Header />
            <Order_History />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
