import React from "react";
import styled, { css } from "styled-components";
import BannerImg1 from "../assets/model2.png";
import BannerImg2 from "../assets/model5.png";

const MainBanner = () => {
  return (
    <Container>
      <img
        src={BannerImg2}
        alt="banner"
        style={{
          width: "380px",
          height: "550px",
          position: "absolute",
          top: -40,
          left: 0,
        }}
      />
      <Line1></Line1>
      <Line2></Line2>
      <img
        src={BannerImg1}
        alt="banner"
        style={{
          width: "500px",
          height: "650px",
          position: "absolute",
          top: -40,
          right: 60,
        }}
      />
    </Container>
  );
};

export default MainBanner;

const Container = styled.div(
  () => css`
    width: 100%;
    height: 500px;
    margin: 48px 0;
    background: #e7e0d4;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 64px;
    position: relative;
    overflow: hidden;
  `
);

const Line1 = styled.div(
  () => css`
    width: 40px;
    height: 290px;
    background: black;
    box-shadow: 10px 10px 10px gray;
  `
);
const Line2 = styled.div(
  () => css`
    width: 76px;
    height: 486px;
    background: black;
    box-shadow: 10px 10px 10px gray;
  `
);
