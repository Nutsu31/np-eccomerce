import React from "react";
import styled, { css } from "styled-components";
import { DataTypes } from "./functions";

const NewAdded = ({ data }: { data: Array<DataTypes> }) => {
  const newAddedItem: Array<DataTypes> = data.reverse();
  console.log(newAddedItem);
  //   console.log(data);
  return (
    <>
      <h1>New Added</h1>
      <Container>
        {newAddedItem.map((newItem) => {
          return (
            <EachModel key={newItem._id}>
              <New>New</New>
              <img
                src={`http://localhost:5001/uploads/${newItem.path}`}
                alt=""
              />
            </EachModel>
          );
        })}
      </Container>
    </>
  );
};

export default NewAdded;

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
    position: relative;
  `
);

const Details = styled.span(
  () => css`
    font-weight: 600;
  `
);

const New = styled.div(
  () => css`
    font-size: 14px;
    font-weight: 600;
    color: white;
    width: 38px;
    height: 20px;
    background: red;
    position: absolute;
    border-radius: 6px;
    left: 10px;
    top: 10px;
    text-align: center;
  `
);
