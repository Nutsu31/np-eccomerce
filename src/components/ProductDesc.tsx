import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { DescriptionRounded } from "@mui/icons-material";
import React from "react";

const ProductDesc = ({ desc }: { desc?: string }) => {
  return (
    <Container>
      <StyledHeaderText>
        <DescriptionRounded />
        პროდუქტის აღწერა
      </StyledHeaderText>
      <Description>{desc}</Description>
    </Container>
  );
};

export default ProductDesc;

const Container = styled.section(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  `
);

const StyledHeaderText = styled.h1(
  () => css`
    width: 300px;
    height: 60px;
    border-bottom: 2px solid;
    display: flex;
    align-items: center;
    justify-content: center;
  `
);
const Description = styled.p(
  () => css`
    width: 500px;
    @media (max-width: 550px) {
      width: 100%;
      padding: 0 48px;
    }
  `
);
