import React from "react";
import { Link } from "react-router-dom";
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
      <ModelImg src={img} alt="model" model={model} />
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

const Container = styled.div(
  () => css`
    width: 100%;
    dipslay: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  `
);
const MenAndWomenSection = styled.div(
  ({ color, model }: { model?: string; color: string }) => css`
    width: 780px;
    height: 340px;
    margin: 66px 0 24px 0;
    display: flex;
    align-items: center;
    justify-content: ${model === "men" ? "flex-end" : "flex-start"};
    background: ${color};
    position: relative;
    @media (max-width: 780px) {
      padding: 0 32px;
    }
    @media (max-width: 650px) {
      padding: 0 168px;
    }
  `
);

const ModelImg = styled.img(
  ({ model }: { model: string }) => css`
    width: 250px;
    position: absolute;
    ${model === "men" ? "left:20px" : "right:20px"};
    @media (max-width: 650px) {
      ${model === "men" ? "left:56px" : "right:56px"}
    }
    @media (max-width: 555px) {
      width: 220px;
      ${model === "men" ? "left:120px" : "right:120px"};
    } ;
  `
);

const Div = styled.div(
  () => css`
  width:420px;
    display:flex;
    flex-direction:column;
    align-items center;
    justify-content:center;
    gap:16px;
    @media(max-width:1450px){
      width:340px
    }
    
    @media(max-width:1400px){
      width:360px;
    }
    
    
  `
);

const Detail1 = styled.span(
  ({ model }: ModelType) => css`
    font-size: 18px;
    font-weight: 600;
    color: ${model === "men" ? "red" : "white"};
    @media (max-width: 1400px) {
      font-size: 18x;
    }
    @media (max-width: 522px) {
      font-size: 16px;
    }
  `
);
const Detail2 = styled.span(
  ({ model }: ModelType) => css`
    font-size: 36px;
    font-weight: 600;
    color: ${model === "men" ? "#070f52" : "white"};

    @media (max-width: 1600px) {
      font-size: 30px;
    }
    @media (max-width: 1450px) {
      font-size: 28px;
    }
    @media (max-width: 1400px) {
      font-size: 26px;
    }
    @media (max-width: 650px) {
      font-size: 26px;
    }
    @media (max-width: 522px) {
      font-size: 22px;
    }
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
