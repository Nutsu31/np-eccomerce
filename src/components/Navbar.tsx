import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import LogoIcon from "../assets/logo.png";
import Menu from "./Menu";
import { NavBarTypes } from "./functions";
import { getItemsFromLocalStorage, CartType } from "./functions";
import {
  PersonOutlineRounded,
  ShoppingBagOutlined,
  LightMode,
  DarkMode,
  Search,
} from "@mui/icons-material";
import { Button, TextField } from "@mui/material";

const Navbar = ({ setSearch, setLogin, login, setDark, dark }: NavBarTypes) => {
  const [cartItem, setCartItem] = useState<CartType[]>([]);
  const navigate = useNavigate();

  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/shop-all");
  };

  useEffect(() => {
    getItemsFromLocalStorage({ setCartItem });
  }, []);

  return (
    <>
      <Header>
        <Link to="/">
          <Image src={LogoIcon} alt="logo" />
        </Link>

        <form
          style={{ width: 400, display: "flex", alignItems: "center" }}
          onSubmit={handleNavigate}
        >
          <Button endIcon={<Search color="disabled" />} type="submit"></Button>
          <TextField
            fullWidth
            placeholder="მოძებნე სასურველი პროდუქტი"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
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
              <ShoppingBagOutlined />
              კალათა
            </p>
          </Link>

          <Link to={"/admin-panel"} style={styles.container}>
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

              {login ? "გასვლა" : "შესვლა"}
            </p>
          </Link>
          <Button
            endIcon={
              dark ? <DarkMode color="warning" /> : <LightMode color="action" />
            }
            onClick={() => setDark(!dark)}
          ></Button>
        </HeaderRight>
      </Header>
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
  `
);

const HeaderRight = styled.div(
  () => css`
    width: 480px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
);

const Image = styled.img(
  () => css`
    width: 130px;
    height: 130px;
  `
);

const styles = {
  container: {
    fontSize: 16,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    opacity: 0.7,
  },
};
