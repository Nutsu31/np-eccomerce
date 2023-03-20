import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { DataTypes } from "./functions";

const NewAdded = ({ newAdded }: { newAdded: Array<DataTypes> }) => {
  let newAddedItem: Array<DataTypes> = newAdded.reverse();
  return (
    <>
      <h1 style={{ borderBottom: "5px solid #e7e0d4" }}>New Added</h1>
      <Container>
        {newAddedItem.map((newItem) => {
          return (
            <>
              <Link
                to={newItem._id}
                key={newItem._id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <EachModel key={newItem._id}>
                  <New>New</New>
                  <img
                    src={`http://localhost:5001/uploads/${newItem.path}`}
                    alt=""
                  />
                  <Details>{newItem.name}</Details>
                  <Details>₾{newItem.price}.00</Details>
                </EachModel>
              </Link>
            </>
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
    margin-bottom: 86px;
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
