import React from "react";
import styled, { css } from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <p>NP Ecommerce By Aleksandre Nutsubidze</p>
      <a href="https://www.linkedin.com/in/aleksandre-nutsubidze-299170254/">
        Linkedn
      </a>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div(
  () => css`
    width: 100%;
    height: 400px;
    border-top: 5px solid #f9f7f4;
    display: flex;
    align-items: center;
    flex-direction: column;
  `
);
