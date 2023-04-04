import styled, { css } from "styled-components";
import { DataTypes } from "./functions";
import Links from "./Links";
import { useContext } from "react";
import { DarkModeContext } from "../pages/Root";
import { Grid } from "@mui/material";
import { Container, GridWrapper } from "./NewAdded";

const BestSeller = ({ data }: { data: Array<DataTypes> }) => {
  const Dark = useContext(DarkModeContext);
  return (
    <Container>
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
      <GridWrapper>
        {data.map((item) => {
          return <Links item={item} key={item._id} />;
        })}
      </GridWrapper>
    </Container>
  );
};

export default BestSeller;
