import React from "react";
import styled, { css } from "styled-components";

const Footer = () => {
  return <FooterContainer>Footer</FooterContainer>;
};

export default Footer;

const FooterContainer = styled.div(
  () => css`
    width: 100%;
    height: 400px;
    border-top: 5px solid #f9f7f4; ;
  `
);
