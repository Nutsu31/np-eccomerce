import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CartType, getItemsFromLocalStorage } from "../components/functions";
import styled, { css } from "styled-components";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
export const SearchContext = createContext("");
export const DarkModeContext = createContext(false);

const Root = () => {
  const [search, setSearch] = useState("");
  const [login, setLogin] = useState(false);
  const [dark, setDark] = useState(false);
  const [cartItem, setCartItem] = useState<Array<CartType>>([]);

  useEffect(() => {
    getItemsFromLocalStorage({ setCartItem });
  }, []);

  return (
    <Container>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <SearchContext.Provider value={search}>
          <DarkModeContext.Provider value={dark}>
            <CssBaseline />
            <Navbar
              setSearch={setSearch}
              setLogin={setLogin}
              login={login}
              setDark={setDark}
              dark={dark}
            />
            <Outlet />
            <Footer />
          </DarkModeContext.Provider>
        </SearchContext.Provider>
      </ThemeProvider>
    </Container>
  );
};

export default Root;

const Container = styled.div(
  () => css`
    width: 100vw;
    min-height: 100vh;
    padding: 0 100px;
    overflow-x: hidden;
    position: relative;
    @media (max-width: 900px) {
      padding: 0 80px;
    }
    @media (max-width: 600px) {
      padding: 0 60px;
    }
    @media (max-width: 400px) {
      padding: 0 40px;
    }
  `
);
