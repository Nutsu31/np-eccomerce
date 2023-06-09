import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import LogoIcon from "../assets/logo.png";
import Menu from "./Menu";
import { NavBarTypes } from "./functions";
import NavbarMobile from "./NavbarMobile";
import {
  PersonOutlineRounded,
  LightMode,
  DarkMode,
  Search,
  CloseOutlined,
} from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import CartBadge from "./CartBadge";

const Navbar = ({ setSearch, setLogin, login, setDark, dark }: NavBarTypes) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const showMenuButton = useMediaQuery("(max-width:1400px)");
  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/shop-all");
  };
  const [cartSize, setCartSize] = useState(0);
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("key")!);
    if (item != null) {
      setCartSize(item.length);
    } else {
      return;
    }
  });
  const location = useLocation();
  useEffect(() => {
    setShowMenu(false);
  }, [location]);
  // useEffect(() => {
  //   setCartSize(cartItem.length);
  // });
  return (
    <>
      <Header>
        <Link to="/">
          <Image
            src={LogoIcon}
            alt="logo"
            style={{ filter: dark ? "contrast(0)" : "" }}
          />
        </Link>

        <form
          style={{
            width: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onSubmit={handleNavigate}
        >
          <Button endIcon={<Search color="disabled" />} type="submit"></Button>
          <TextField
            sx={{ width: { sm: 200, md: 380, xl: "100%" } }}
            // fullWidth
            placeholder="მოძებნე სასურველი პროდუქტი"
            onChange={(e) => setSearch(e.target.value)}
            variant="standard"
            style={window.screenX === 600 ? { display: "none" } : undefined}
          />
        </form>
        <NavbarMobile
          setSearch={setSearch}
          login={login}
          setLogin={setLogin}
          dark={dark}
          setDark={setDark}
          showMenu={showMenu}
          cartSize={cartSize}
        />
        <HeaderRight>
          <Link to="/tracker" style={styles.container}>
            <p
              style={{
                width: "fit-content",
                display: "flex",
                alignItems: "center",
                gap: 4,
                textDecoration: "none",
                color: dark ? "white" : "black",
              }}
            >
              ადევნე თვალი შეკვეთას
            </p>
          </Link>
          <Link
            to="/cart"
            style={
              (styles.container,
              {
                position: "relative",
                textDecoration: "none",
                opacity: 0.7,
              })
            }
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                textDecoration: "none",
                color: dark ? "white" : "black",
              }}
            >
              <CartBadge cartSize={cartSize} />
            </p>
          </Link>

          <Link to={"/login"} style={styles.container}>
            <p
              onClick={() => setLogin(!login)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                textDecoration: "none",
                color: dark ? "white" : "black",
              }}
            >
              <PersonOutlineRounded />
              ავტორიზაცია
            </p>
          </Link>
          <Button
            endIcon={
              dark ? <DarkMode color="warning" /> : <LightMode color="action" />
            }
            onClick={() => setDark(!dark)}
          ></Button>
        </HeaderRight>
        {showMenuButton ? (
          <Button
            style={{
              position: "absolute",
              top: showMenu ? 10 : 20,
              right: showMenu ? "40px" : "0",
              transition: "0.3s ease",
              zIndex: 4,
            }}
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? (
              <CloseOutlined color="warning" />
            ) : (
              <MenuIcon color="disabled" />
            )}
          </Button>
        ) : null}
      </Header>
      <Menu dark={dark} />
    </>
  );
};

export default Navbar;

const Header = styled.header(
  () => css`
    width: 100%;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    @media (max-width: 1400px) {
      padding: 20px 0;
      height: 200px;
      flex-direction: column;
      justify-content: center;
    }
  `
);

const HeaderRight = styled.div(
  () => css`
    width: 480px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1400px) {
      display: none;
    }
  `
);

const Image = styled.img(
  () => css`
    width: 60px;
    @media (max-width: 1400px) {
      margin-left: 80px;
    }
    @media (max-width: 900px) {
      margin: 0;
    }
  `
);

export const styles = {
  container: {
    fontSize: 16,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    opacity: 0.7,
  },
  menu: {
    position: "absolute",
    top: "24px",
    transition: "0.3s ease",
  },
};
