import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Categories from "./Categories";
import {
  brandArray,
  categoriesArray,
  colorArray,
  sizeArray,
} from "./functions";
import styled, { css } from "styled-components";
import { Button, useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";

const CategoriesMobile = ({
  setFilterByCategory,
  setShowCategories,
  showCategories,
}: {
  showCategories: boolean;
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterByCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const ShowButton = useMediaQuery("(max-width:1400px)");
  const { pathname } = useLocation();

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {ShowButton && pathname !== "/admin-panel/selling" ? (
        <Button
          variant="text"
          onClick={() => setShowCategories(!showCategories)}
        >
          <MenuIcon color="action" />
        </Button>
      ) : null}
      {showCategories ? (
        <Container>
          <Categories
            name="Categories"
            option={categoriesArray}
            setFilterByCategory={setFilterByCategory}
          />
          <Categories
            name="Brand"
            option={brandArray}
            setFilterByCategory={setFilterByCategory}
          />
          <Categories
            name="Size"
            option={sizeArray}
            setFilterByCategory={setFilterByCategory}
          />
          <Categories
            name="Color"
            option={colorArray}
            setFilterByCategory={setFilterByCategory}
          />
        </Container>
      ) : null}
    </div>
  );
};

export default CategoriesMobile;

const Container = styled.div(
  () => css`
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
  `
);
