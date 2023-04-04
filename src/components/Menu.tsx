import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Menu = ({ dark }: { dark: boolean }) => {
  return (
    <MenuBar dark={dark}>
      <Link
        style={{
          textDecoration: "none",
          color: dark ? "rgba(255, 255, 255, 0.3)" : "black",
          fontWeight: 600,
        }}
        to="/shop-women"
      >
        ქალი
      </Link>
      <Link
        style={{
          textDecoration: "none",
          color: dark ? "rgba(255, 255, 255, 0.3)" : "black",
          fontWeight: 600,
        }}
        to="/shop-men"
      >
        კაცი
      </Link>
      <Link
        style={{
          textDecoration: "none",
          color: dark ? "rgba(255, 255, 255, 0.3)" : "black",
          fontWeight: 600,
        }}
        to="/shop-all"
      >
        Shop All
      </Link>
      <Link
        style={{
          textDecoration: "none",
          color: dark ? "rgba(255, 255, 255, 0.3)" : "black",
          fontWeight: 600,
        }}
        to="/sales"
      >
        Sale!!!
      </Link>
    </MenuBar>
  );
};

export default Menu;

const MenuBar = styled.div(
  ({ dark }: { dark: boolean }) => css`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-bottom: 5px solid ${dark ? "rgba(255, 255, 255, 0.3)" : "lightgray"};
  `
);

const styles = {
  container: {
    fontWeight: 600,
    textDecoration: "none",
  },
};
