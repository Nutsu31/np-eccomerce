import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { DarkModeContext } from "../pages/Root";
import { GitHub, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const Dark = useContext(DarkModeContext);
  return (
    <FooterContainer Dark={Dark}>
      <div
        style={{ height: 60, display: "flex", gap: 24, alignItems: "center" }}
      >
        <a
          href="https://www.linkedin.com/in/aleksandre-nutsubidze-299170254/"
          style={{ textDecoration: "none", display: "flex", color: "#039be5" }}
        >
          <LinkedIn /> Linkedn
        </a>
        <a
          href="https://github.com/Nutsu31"
          style={{ textDecoration: "none", display: "flex", color: "#039be5" }}
        >
          <GitHub /> Github
        </a>
      </div>
      <p>NP Ecommerce By Aleksandre Nutsubidze</p>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div(
  ({ Dark }: { Dark: boolean }) => css`
    width: 100%;
    height: 300px;
    margin-top: 20px;
    border-top: 5px solid ${Dark ? "rgba(255, 255, 255, 0.3)" : "#f9f7f4"};
    display: flex;
    align-items: center;
    flex-direction: column;
  `
);
