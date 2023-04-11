import {
  DarkMode,
  LightMode,
  PersonOutlineRounded,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { styles } from "./Navbar";
import { NavBarTypes } from "./functions";
import { Button } from "@mui/material";
import CartBadge from "./CartBadge";

const NavbarMobile = ({
  dark,
  setLogin,
  login,
  setDark,
  showMenu,
  cartSize,
}: NavBarTypes) => {
  return (
    <Container dark={dark} showMenu={showMenu}>
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
          onClick={() => (login ? setLogin(false) : null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            textDecoration: "none",
            color: dark ? "white" : "black",
          }}
        >
          <PersonOutlineRounded />

          {login ? "გასვლა" : "შესვლა"}
        </p>
      </Link>
      <Button
        endIcon={
          dark ? <DarkMode color="warning" /> : <LightMode color="action" />
        }
        onClick={() => setDark(!dark)}
      ></Button>
    </Container>
  );
};

export default NavbarMobile;

const Container = styled.div(
  ({ dark, showMenu }: { dark: boolean; showMenu?: boolean }) => css`
    width: 300px;
    height: ${showMenu ? "100vh" : 0};
    padding: 48px 24px;
    display: none;
    gap: 16px;
    position: absolute;
    top: 0;
    z-index: 3;
    right: ${showMenu ? "-200px" : "-700px"};
    background: ${dark ? "gray" : "lightgray"};
    flex-direction: column;
    align-items: flex-start;
    transition: 0.4s ease;
    @media (max-width: 1400px) {
      display: flex;
    }
    @media (max-width: 900px) {
      right: ${showMenu ? "-60px" : "-700px"};
    } ;
  `
);
