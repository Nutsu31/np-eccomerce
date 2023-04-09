import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { SearchContext } from "../pages/Root";
import Categories from "./Categories";
import {
  brandArray,
  categoriesArray,
  colorArray,
  DataTypes,
  getClothingModels,
  sizeArray,
} from "./functions";
import Links from "./Links";
import CategoriesMobile from "./CategoriesMobile";

const Lists = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const [filterByCategory, setFilterByCategory] = useState("");
  const searchFilter = useContext(SearchContext);
  const { pathname } = useLocation();
  const [showCategories, setShowCategories] = useState(false);

  let capitalLetter =
    searchFilter.charAt(0).toUpperCase() + searchFilter.slice(1);

  const dataFilter = data.filter((item) => {
    if (pathname === "/shop-men") {
      if (item.gender === "men" || item.gender === "unisex") {
        return item;
      }
    }
    if (pathname === "/shop-women") {
      if (item.gender === "women" || item.gender === "unisex") {
        return item;
      }
    }
    if (pathname === "/sales") {
      if (item.sale) {
        return item;
      }
    } else if (pathname === "/shop-all") {
      if (item.name.includes(filterByCategory)) {
        return item;
      } else if (item.category.includes(filterByCategory)) {
        return item;
      } else if (item.style.includes(filterByCategory)) {
        return item;
      } else if (item.color.includes(filterByCategory)) {
        return item;
        // } else if (item.size.includes(filterByCategory)) {
        //   return item;
      }
    } else if (pathname === "/admin-panel/selling") {
      return item;
    }
  });

  useEffect(() => {
    getClothingModels({ setData });
  }, [filterByCategory]);

  useEffect(() => {
    setFilterByCategory(capitalLetter);
  }, [capitalLetter]);

  return (
    <>
      <CategoriesMobile
        setFilterByCategory={setFilterByCategory}
        showCategories={showCategories}
        setShowCategories={setShowCategories}
      />
      <Container>
        <CategoriesWrapper>
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
        </CategoriesWrapper>
        <div style={{ width: "100%" }}>
          {searchFilter ? (
            <div>
              <h3>Search result for: "{searchFilter}"</h3>
            </div>
          ) : null}
          <LinkWrapper>
            {dataFilter.map((item) =>
              item.storage <= 0 ? null : (
                <Links
                  item={item}
                  key={Math.random() * Math.random() * Math.random()}
                />
              )
            )}
          </LinkWrapper>
        </div>
      </Container>
    </>
  );
};

export default Lists;

const Container = styled.div(
  () => css`
    width: 100%;
    min-height: 100vh;
    display: flex;
    alignitems: flex-start;
    justifycontent: flex-start;
    flexwrap: nowrap;
  `
);
const CategoriesWrapper = styled.div(
  () => css`
    min-width: 224px;
    display: inline-block;
    @media (max-width: 1400px) {
      display: none;
    } ;
  `
);

const LinkWrapper = styled.div(
  () => css`
    width: 100%;
    padding: 24px 0;
    margin-bottom: 120px;
    display: inline-grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 10px;
    align-self: center;
    @media (max-width: 1800px) {
      justify-items: center;
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1570px) {
      justify-items: center;
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 1400px) {
      justify-content: center;
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1370px) {
      justify-content: center;
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 1100px) {
      justify-content: center;
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 620px) {
      justify-content: center;
      grid-template-columns: repeat(1, 1fr);
    }
  `
);

const Details = styled.span(
  () => css`
    font-weight: 600;
  `
);
