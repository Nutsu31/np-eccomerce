import React from "react";
import styled, { css } from "styled-components";

const MenAndWomen = ({ img, color }: { img: string; color: string }) => {
  return (
    <MenAndWomenSection color={color}>
      <img src={img} alt="model" width={250} />
    </MenAndWomenSection>
  );
};

export default MenAndWomen;

const MenAndWomenSection = styled.div(
  ({ color }) => css`
    width: 780px;
    height: 340px;
    margin: 64px 0;
    background: ${color};
  `
);
