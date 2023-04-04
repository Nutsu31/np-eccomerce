import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
  return (
    <>
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
            {/* <Footer /> */}
          </DarkModeContext.Provider>
        </SearchContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default Root;
