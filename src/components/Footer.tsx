import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { DarkModeContext } from "../pages/Root";

const Footer = () => {
  const Dark = useContext(DarkModeContext);
  return (
    <FooterContainer Dark={Dark}>
      <p>NP Ecommerce By Aleksandre Nutsubidze</p>
      <a href="https://www.linkedin.com/in/aleksandre-nutsubidze-299170254/">
        Linkedn
      </a>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div(
  ({ Dark }: { Dark: boolean }) => css`
    width: 100%;
    height: 300px;
    border-top: 5px solid ${Dark ? "rgba(255, 255, 255, 0.3)" : "#f9f7f4"};
    display: flex;
    align-items: center;
    flex-direction: column;
  `
);
