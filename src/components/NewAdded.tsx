import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { DataTypes } from "./functions";
import Links from "./Links";
import { DarkModeContext } from "../pages/Root";

const NewAdded = ({ newAdded }: { newAdded: Array<DataTypes> }) => {
  let newAddedItem: Array<DataTypes> = newAdded.reverse();
  const Dark = useContext(DarkModeContext);

  return (
    <Container>
      <h1
        style={{
          color: `${Dark ? "rgba(255, 255, 255, 0.3)" : "black"} `,
          borderBottom: `5px solid ${
            Dark ? "rgba(255, 255, 255, 0.3)" : "#e7e0d4"
          } `,
          height: 50,
        }}
      >
        New Added
      </h1>
      <GridWrapper>
        {newAddedItem.map((newItem) => {
          return (
            <div key={Math.random() * Math.random()}>
              <Links item={newItem} key={newItem._id} />
            </div>
          );
        })}
      </GridWrapper>
    </Container>
  );
};

export default NewAdded;

export const Container = styled.div(
  () => css`
    width: 100%;
    height: fit-content;
    @media (max-width: 1325px) {
      height: 1000px;
    }
    @media (max-width: 610px) {
      height: 2200px;
    }
  `
);
export const GridWrapper = styled.div(
  () => css`
    width: 100%;
    height: 540px;
    padding: 48px 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: center;
    @media (max-width: 1600px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1325px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-row: repeat(2, 1fr);
      grid-column-gap: 10px;
      grid-row-gap: 10px;
    }
    @media (max-width: 610px) {
      grid-template-columns: repeat(1, 1fr);
      grid-template-row: repeat(4, 1fr);
      grid-column-gap: 0px;
    } ;
  `
);

export const EachModel = styled.div(
  () => css`
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  `
);

export const Details = styled.span(
  () => css`
    font-weight: 500;
  `
);
export const SaledPrice = styled.span(
  () => css`
    font-weight: 600;
    color: red;
    text-decoration: line-through;
  `
);

export const New = styled.div(
  () => css`
    font-size: 14px;
    font-weight: 600;
    color: white;
    width: 38px;
    height: 20px;
    background: navy;
    position: absolute;
    border-radius: 6px;
    left: 10px;
    top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  `
);
export const Sale = styled.div(
  ({ collections }: { collections: string }) => css`
    font-size: 14px;
    font-weight: 600;
    color: white;
    width: 38px;
    height: 20px;
    background: red;
    position: absolute;
    border-radius: 6px;
    left: 10px;
    top: ${collections ? "40px" : "10px"};
    display: flex;
    align-items: center;
    justify-content: center;
  `
);
