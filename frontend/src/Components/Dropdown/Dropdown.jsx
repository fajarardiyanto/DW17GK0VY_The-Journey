import React from "react";

import "./dropdown.css";

import axios from "axios";
import User from "../../Images/user.png";
import TripIcon from "../../Images/Group.png";
import LogoutIcon from "../../Images/logout.png";
import BookmarkIcon from "../../Images/bookmarkIcon.png";

import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { Dropdown, Image } from "react-bootstrap";

function DropdownUser() {
  const id = localStorage.id;
  let history = useHistory();

  const openProfile = () => {
    history.push(`/profile/${id}`);
  };

  const openNewJourney = () => {
    history.push(`/addJourney`);
  };

  const openBookmark = () => {
    history.push(`/bookmark`);
  };

  const logoutAccount = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    history.push(`/`);
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/${id}`);

      return res;
    } catch (err) {}
  };

  const { isLoadingUser, data } = useQuery("user", getUser);
  const userResult = data;

  return (
    <div className="dropdown__div">
      <Dropdown>
        <Dropdown.Toggle
          variant="flat"
          id="dropdown-menu-align-right"
          className="pps my-dropdown-toggle"
        >
          {isLoadingUser || !userResult || !userResult?.data.data.id ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <Image
                src={`http://localhost:8080/Images/${userResult.data.data.image}`}
                alt="foto-profile"
                className="image__profile_xs"
              />
            </>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu className="menu-dropdown">
          <span className="segitiga"></span>
          <div className="div-item">
            <Dropdown.Item
              onClick={() => openProfile()}
              className="text-profile btn-dropdown"
            >
              <img src={User} className="dropdown-icon" alt="icon-user" />
              Profile
            </Dropdown.Item>
          </div>
          <div className="div-item">
            <Dropdown.Item
              onClick={() => openNewJourney()}
              className="text-profile"
            >
              <img src={TripIcon} className="dropdown-icon" alt="icon-pay" />
              New Journey
            </Dropdown.Item>
          </div>
          <div className="div-item">
            <Dropdown.Item
              onClick={() => openBookmark()}
              className="text-profile"
            >
              <img
                src={BookmarkIcon}
                className="dropdown-icon"
                alt="icon-pay"
              />
              Bookmark
            </Dropdown.Item>
          </div>
          <hr className="hr-dropdown" />
          <div className="div-logout-dropdown div-item">
            <Dropdown.Item
              onClick={() => logoutAccount()}
              className="text-profile"
            >
              <img src={LogoutIcon} className="dropdown-icon" alt="icon-pay" />
              Logout
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropdownUser;
