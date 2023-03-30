import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Menu = () => {
  return (
    <MenuBar>
      <Link style={styles.container} to="/shop-women">
        ქალი
      </Link>
      <Link style={styles.container} to="/shop-men">
        კაცი
      </Link>
      <Link style={styles.container} to="/shop-all">
        Shop All
      </Link>
      <Link style={styles.container} to="/sales">
        Sale!!!
      </Link>
    </MenuBar>
  );
};

export default Menu;

const MenuBar = styled.div(
  () => css`
    width: 100%;
    height: 40px;
    display: flex;
    gap: 16px;
    border-bottom: 5px solid #f9f7f4;
  `
);

const styles = {
  container: {
    color: "black",
    fontWeight: 600,
    textDecoration: "none",
  },
};
