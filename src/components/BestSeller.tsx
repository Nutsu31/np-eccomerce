import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { DataTypes } from "./functions";

const BestSeller = ({ data }: { data: Array<DataTypes> }) => {
  return (
    <div>
      <h1 style={{ borderBottom: "5px solid #e7e0d4" }}>Best Seller</h1>
      <Container>
        {data.map((item) => {
          return (
            <Link
              to={`/${item._id}`}
              key={item._id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <EachModel>
                <img
                  src={`http://localhost:5001/uploads/${item.path}`}
                  alt="model"
                />
                <Details>{item.name}</Details>
                <Details>
                  ₾{item.price}.00{" "}
                  <span
                    style={{ color: "red", textDecoration: "line-through" }}
                  >
                    ₾110.00
                  </span>
                </Details>
              </EachModel>
            </Link>
          );
        })}
      </Container>
    </div>
  );
};

export default BestSeller;

const Container = styled.div(
  () => css`
    width: 100%;
    height: 400px;
    margin-bottom: 64px;
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
    gap: 8px;
  `
);

const Details = styled.span(
  () => css`
    font-weight: 600;
  `
);
