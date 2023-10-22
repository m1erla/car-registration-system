import React, { useEffect } from "react";
import "../Bar/styles.css";
import { MdOutlineHome, MdOutlineFolderCopy } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "antd";

export default function Bar() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
    navigate(0);
  };

  const handlePasswordChange = () => {
    navigate("/changepassword");
    navigate(0);
  };
  return (
    <main className="menuMain">
      <Link to={"/"}>
        <img
          style={{ width: "100%" }}
          src="https://t3.ftcdn.net/jpg/04/06/91/62/360_F_406916265_hxmrv7wgw9SZN9871yebxQJAX7HsHdNp.jpg"
        />
      </Link>

      <NavLink onClick={handleHome} to={"/"}>
        <section>
          <MdOutlineHome style={{ width: "25px", height: "25px" }} /> Home
        </section>
      </NavLink>
      {localStorage.getItem("token") ? (
        <NavLink onClick={handlePasswordChange} to={"/changepassword"}>
          <section>
            <MdOutlineFolderCopy style={{ width: "25px", height: "25px" }} />{" "}
            Change Password
          </section>
        </NavLink>
      ) : (
        ""
      )}

      <section></section>

      {localStorage.getItem("token") ? (
        ""
      ) : (
        <>
          <NavLink to={"/signin"}>
            <section>
              <MdOutlineFolderCopy style={{ width: "25px", height: "25px" }} />{" "}
              Login
            </section>
          </NavLink>
          <NavLink to={"/register"}>
            <section>
              <MdOutlineFolderCopy style={{ width: "25px", height: "25px" }} />{" "}
              Register
            </section>
          </NavLink>
        </>
      )}
    </main>
  );
}
