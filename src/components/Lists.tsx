import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { DataTypes, getClothingModels, getColor } from "./functions";

const Lists = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);

  useEffect(() => {
    getClothingModels({ setData });
  }, []);
  return (
    <Container>
      {data.map((item) => {
        return (
          <ListItem key={Math.random() * Math.random()}>
            <img
              src={`http://localhost:5001/uploads/${item.path}`}
              alt=""
              width={200}
            />
            <p>{item.name}</p>
            <p>{item.price}.00₾</p>
            <p>{item.size}</p>
            <Color color={item.color}>c</Color>
          </ListItem>
        );
      })}
    </Container>
  );
};

export default Lists;

const Container = styled.div(
  () => css`
    width: 100%;
    min-heigth: 70vh;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: space-evenly;
  `
);

const ListItem = styled.div(
  () => css`
    width: 200px;
    height: 480px;
    background: gray;
    display: flex;
    align-items: center;
    justify-contnet: space-between;
    flex-direction: column;
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
