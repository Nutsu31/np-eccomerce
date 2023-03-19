import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { DataTypes, getClothingModels } from "./functions";

const BestSeller = ({ data }: { data: Array<DataTypes> }) => {
  return (
    <>
      <h1>Best Seller</h1>
      <Container>
        {data.map((item) => {
          return (
            <Link to={`/${item._id}`}>
              <EachModel>
                <img
                  src={`http://localhost:5001/uploads/${item.path}`}
                  alt="model"
                  width="100%"
                  height="300px"
                />
                <Details>{item.name}</Details>
                <Details>₾{item.price}.00</Details>
              </EachModel>
            </Link>
          );
        })}
      </Container>
    </>
  );
};

export default BestSeller;

const Container = styled.div(
  () => css`
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  `
);

const EachModel = styled.div(
  () => css`
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `
);

const Details = styled.span(
  () => css`
    font-weight: 600;
  `
);
