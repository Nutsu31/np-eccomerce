import React from "react";
import styled, { css } from "styled-components";

const FollowUs = () => {
  return (
    <Container>
      <h3 style={{ color: "gray" }}>გამოგვყევით</h3>
      <div>
        <Social href="https://www.facebook.com/profile.php?id=100089102174444">
          Facebook
        </Social>
        <Social href="https://www.instagram.com/np_wpc/">Instagram</Social>
      </div>
    </Container>
  );
};

export default FollowUs;

const Container = styled.div(
  () => css`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 48px;
  `
);

const Social = styled.a(
  () => css`
    color: black;
    font-size: 48px;
    font-weight: 700;
    text-decoration: none;
    opacity: 0.6;
    margin-left: 36px;
  `
);
