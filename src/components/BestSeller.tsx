import styled, { css } from "styled-components";
import { DataTypes } from "./functions";
import Links from "./Links";
import { useContext } from "react";
import { DarkModeContext } from "../pages/Root";
import { Grid } from "@mui/material";

const BestSeller = ({ data }: { data: Array<DataTypes> }) => {
  const Dark = useContext(DarkModeContext);
  return (
    <div>
      <h1
        style={{
          color: `${Dark === true ? "rgba(255, 255, 255, 0.3)" : "black"} `,
          borderBottom: `5px solid ${
            Dark ? "rgba(255, 255, 255, 0.3)" : "#e7e0d4"
          } `,
          height: 50,
        }}
      >
        Best Seller
      </h1>
      <Container>
        {data.map((item) => {
          return <Links item={item} key={item._id} />;
        })}
      </Container>
    </div>
  );
};

export default BestSeller;

const Container = styled.div(
  () => css`
    width: 100%;
    height: 540px;
    padding: 48px 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 20px;
  `
);
