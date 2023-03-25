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

const Lists = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const [filterByCategory, setFilterByCategory] = useState("");
  const searchFilter = useContext(SearchContext);
  const { pathname } = useLocation();

  console.log(pathname);
  let calmeCase = searchFilter.charAt(0).toUpperCase() + searchFilter.slice(1);

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
        console.log(item);
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
      } else if (item.size.includes(filterByCategory)) {
        return item;
      }
    }
  });

  useEffect(() => {
    getClothingModels({ setData });
  }, [filterByCategory]);

  useEffect(() => {
    setFilterByCategory(calmeCase);
  }, [calmeCase]);

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex" }}>
      <div style={{ display: "inline-block", marginRight: 24 }}>
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
      </div>
      <div>
        {searchFilter ? (
          <div>
            <h3>Search result for: "{searchFilter}"</h3>
          </div>
        ) : null}
        <Container>
          {dataFilter.map((item) => {
            return <Links item={item} key={item._id} />;
          })}
        </Container>
      </div>
    </div>
  );
};

export default Lists;

const Container = styled.div(
  () => css`
    width: 85%;
    margin-bottom: 64px;
    display: inline-grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 180px;
    flex-wrap: wrap;
  `
);

const Details = styled.span(
  () => css`
    font-weight: 600;
  `
);
