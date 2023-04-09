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
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
);

const StyledHeaderText = styled.h1(
  () => css`
    width: 300px;
    height: 60px;
    border-bottom: 2px solid;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `
);
const Description = styled.p(
  () => css`
    width: 500px;
  `
);
