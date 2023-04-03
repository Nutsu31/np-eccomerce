import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CartType, DataTypes, getClothingModels } from "./functions";
import Links from "./Links";
import { EachModel } from "./NewAdded";

const WeRecomemdedModels = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const [randomItem, setRandomItem] = useState<DataTypes | undefined>();
  data.length = 5;

  useEffect(() => {
    function getRandomIndex(item: Array<DataTypes>) {
      const randomIndex = Math.floor(Math.random() * 5);
      return setRandomItem(item[randomIndex]);
    }
    getRandomIndex(data);
  }, [data]);
  useEffect(() => {
    getClothingModels({ setData });
  }, []);
  return (
    <>
      <h1
        style={{
          height: 60,
          borderBottom: "1px solid lightgray",
          margin: "24px 0",
        }}
      >
        ჩვენ ასევე გირჩევთ...
      </h1>
      <Container>
        {data.map((item) => (
          <EachModel key={item._id}>
            <Links item={item} />
          </EachModel>
        ))}
      </Container>
    </>
  );
};

export default WeRecomemdedModels;

const Container = styled.div(
  () => css`
    width: 100%;
    height: 400px;
    margin-bottom: 64px;
    display: flex;
    align-tems: center;
    justify-content: center;
    gap: 24px;
  `
);
