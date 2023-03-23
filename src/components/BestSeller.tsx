import styled, { css } from "styled-components";
import { DataTypes } from "./functions";
import Links from "./Links";

const BestSeller = ({ data }: { data: Array<DataTypes> }) => {
  return (
    <div>
      <h1 style={{ borderBottom: "5px solid #e7e0d4" }}>Best Seller</h1>
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
    height: 400px;
    margin-bottom: 64px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 20px;
  `
);
