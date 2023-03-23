import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const SearchContext = createContext("");

const Root = () => {
  const [search, setSearch] = useState("");
  const [login, setLogin] = useState(false);
  return (
    <>
      <SearchContext.Provider value={search}>
        <Navbar setSearch={setSearch} setLogin={setLogin} login={login} />
        <Outlet />
        <Footer />
      </SearchContext.Provider>
    </>
  );
};

export default Root;
