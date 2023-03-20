import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Categories from "./Categories";
import { DataTypes, getClothingModels, getColor } from "./functions";

const categoriesArray = ["Suits", "T-Shirts"];
const brandArray = ["Classic", "Urban"];
const sizeArray = ["S", "M", "L"];
const colorArray = ["Black", "White", "Gray", "Pink", "Purple"];

const Lists = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const [filterByCategory, setFilterByCategory] = useState("");

  const dataFilter = data.filter((item) => {
    switch (filterByCategory) {
      case "Suits":
        return item.category === filterByCategory;
      case "T-Shirts":
        return item.category === filterByCategory;
      case "Classic":
        return item.style === filterByCategory;
      case "Urban":
        return item.style === filterByCategory;
      case "Gray":
        return item.color === filterByCategory;
      case "Black":
        return item.color === filterByCategory;
      case "White":
        return item.color === filterByCategory;
      case "Pink":
        return item.color === filterByCategory;
      case "Purple":
        return item.color === filterByCategory;
      case "S":
        return item.size === filterByCategory;
      case "M":
        return item.size === filterByCategory;
      case "L":
        return item.size === filterByCategory;
      case "":
        return data;
    }
  });

  useEffect(() => {
    getClothingModels({ setData });
  }, [setFilterByCategory]);

  return (
    <>
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
      <Container>
        {dataFilter.map((item) => {
          return (
            <EachModel key={Math.random() * Math.random()}>
              <img
                src={`http://localhost:5001/uploads/${item.path}`}
                alt=""
                width={200}
              />
              <Details>{item.name}</Details>
              <Details>{item.price}.00₾</Details>
            </EachModel>
          );
        })}
      </Container>
    </>
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
    grid-column-gap: 8px;
    grid-row-gap: 64px;
  `
);

const EachModel = styled.div(
  () => css`
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  `
);

const Details = styled.span(
  () => css`
    font-weight: 600;
  `
);

const Color = styled.div(
  ({ color }) => css`
    color:transparent;
    width:20px;
    height:20px
    border:1px solid black;
    background: ${getColor(color)};
  `
);
