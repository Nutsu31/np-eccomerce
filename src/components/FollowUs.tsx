import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { DarkModeContext } from "../pages/Root";

const FollowUs = () => {
  const Dark = useContext(DarkModeContext);
  return (
    <Container>
      <h3 style={{ color: "gray" }}>გამოგვყევით</h3>
      <div>
        <Social
          Dark={Dark}
          href="https://www.facebook.com/profile.php?id=100089102174444"
        >
          Facebook
        </Social>
        <Social Dark={Dark} href="https://www.instagram.com/np_wpc/">
          Instagram
        </Social>
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
  ({ Dark }: { Dark: boolean }) => css`
    color: ${Dark ? "rgba(255, 255, 255, 0.5) " : "black"};
    font-size: 48px;
    font-weight: 700;
    text-decoration: none;
    opacity: 0.6;
    margin-left: 36px;
  `
);
