import React from "react";
import styled, { css } from "styled-components";
import { DataTypes } from "./functions";
import Links from "./Links";

const NewAdded = ({ newAdded }: { newAdded: Array<DataTypes> }) => {
  let newAddedItem: Array<DataTypes> = newAdded.reverse();

  return (
    <>
      <h1 style={{ borderBottom: "5px solid #e7e0d4" }}>New Added</h1>
      <Container>
        {newAddedItem.map((newItem) => {
          return (
            <div key={Math.random() * Math.random()}>
              <Links item={newItem} key={newItem._id} />
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default NewAdded;

export const Container = styled.div(
  () => css`
    width: 100%;
    height: 400px;
    margin-bottom: 86px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 20px;
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
    font-weight: 600;
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
