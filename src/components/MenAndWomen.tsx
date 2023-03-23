import React from "react";
import { Link, Navigate } from "react-router-dom";
import styled, { css } from "styled-components";

const MenAndWomen = ({
  img,
  color,
  model,
}: {
  img: string;
  color: string;
  model: string;
}) => {
  return (
    <MenAndWomenSection color={color} model={model}>
      <img
        src={img}
        alt="model"
        width={250}
        style={
          model === "men"
            ? { width: 250, position: "absolute", left: 20 }
            : { width: 250, position: "absolute", right: 20 }
        }
      />
      <Div>
        <Detail1 model={model}>
          {model === "men" ? "MEN'S CLOTHING" : "WOMEN'S CLOTHING"}
        </Detail1>
        <Detail2 model={model}>
          {model === "men"
            ? "New Models for Men"
            : `Up to 40% off on all items.`}
        </Detail2>
        <Sale model={model}>{model === "men" ? "SALE'S UP 50%" : null}</Sale>
        <Link to="/shop-all">
          <ShopNowButton model={model}>SHOP NOW</ShopNowButton>
        </Link>
      </Div>
    </MenAndWomenSection>
  );
};

export default MenAndWomen;

interface ModelType {
  model: string;
}
const MenAndWomenSection = styled.div(
  ({ color, model }: { model?: string; color: string }) => css`
    width: 780px;
    height: 340px;
    margin: 86px 0;
    display: flex;
    align-items: center;
    justify-content: ${model === "men" ? "flex-end" : "flex-start"};
    background: ${color};
    position: relative;
  `
);

const Div = styled.div(
  () => css`
  width:560px;
    display:flex;
    flex-direction:column;
    align-items center;
    justify-content:center;
    gap:16px;
  `
);

const Detail1 = styled.span(
  ({ model }: ModelType) => css`
    font-size: 18px;
    font-weight: 600;
    color: ${model === "men" ? "red" : "white"};
  `
);
const Detail2 = styled.span(
  ({ model }: ModelType) => css`
    font-size: 36px;
    font-weight: 600;
    color: ${model === "men" ? "#070f52" : "white"};
  `
);

const Sale = styled.span(
  ({ model }: ModelType) => css`
    color: gray;
    font-weight: 600;
  `
);

const ShopNowButton = styled.button(
  ({ model }: ModelType) => css`
    color: ${model === "men" ? "white" : "black"};
    font-weight: 700;
    width: 160px;
    height: 40px;
    border: none;
    background: ${model === "men" ? "#070f52" : "white"};
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
      color: ${model === "men" ? "#070f52" : "white"};
      background: ${model === "men" ? "white" : "black"};
    }
  `
);
