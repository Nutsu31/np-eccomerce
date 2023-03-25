import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import LogoIcon from "../assets/logo.png";
import { FaSearch, FaShoppingBasket, FaUser } from "react-icons/fa";
import Menu from "./Menu";
import { NavBarTypes } from "./functions";

const Navbar = ({ setSearch, setLogin, login }: NavBarTypes) => {
  const navigate = useNavigate();

  const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/shop-all");
  };

  return (
    <>
      <Header>
        <Link to="/">
          <Image src={LogoIcon} alt="logo" />
        </Link>

        <form style={styles.container} onSubmit={handleNavigate}>
          <button style={{ background: "none", border: "none" }}>
            <FaSearch style={{ opacity: 0.7 }} />
          </button>
          <SearchBar
            placeholder="მოძებნე სასურველი პროდუქტი"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <InfoForUser>
          <Link to="/tracker" style={styles.container}>
            ადევნე თვალი შეკვეთას
          </Link>
          <Link
            to="/cart"
            style={
              (styles.container,
              {
                position: "relative",
                textDecoration: "none",
                opacity: 0.7,
                color: "black",
              })
            }
          >
            {true ? (
              <div
                style={{
                  background: "red",
                  width: "16px",
                  borderRadius: "50%",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <span>{1}</span>
              </div>
            ) : null}
            <FaShoppingBasket />
            კალათა
          </Link>

          <Link to={"/admin-panel"} style={styles.container}>
            <FaUser />
            <p onClick={() => setLogin(!login)}>
              {login ? "გასვლა" : "შესვლა"}
            </p>
          </Link>
        </InfoForUser>
      </Header>
      <Menu />
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

const Image = styled.img(
  () => css`
    width: 130px;
    height: 130px;
  `
);

const SearchBar = styled.input(
  () => css`
    font-size: 1^px;
    width: 380px;
    height: 30px;
    padding-left: 16px;
    outline: none;
    border: none;
    background: #e7e0d4;
    &::placeholder {
      opacity: 0.8;
    }
  `
);

const InfoForUser = styled.div(
  () => css`
    width: 420px;
    display: flex;
    justify-content: space-between;
  `
);

const styles = {
  container: {
    fontSize: 16,
    color: "black",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    opacity: 0.7,
  },
};
