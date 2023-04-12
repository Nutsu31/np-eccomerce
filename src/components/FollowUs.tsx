import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { DarkModeContext } from "../pages/Root";

const FollowUs = () => {
  const Dark = useContext(DarkModeContext);
  return (
    <Container>
      <HeaderText>Follow Us</HeaderText>
      <SocialWrapper>
        <Social
          Dark={Dark}
          href="https://www.facebook.com/profile.php?id=100089102174444"
        >
          Facebook
        </Social>
        <Social Dark={Dark} href="https://www.instagram.com/np_wpc/">
          Instagram
        </Social>
      </SocialWrapper>
    </Container>
  );
};

export default FollowUs;

const Container = styled.div(
  () => css`
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 48px;
  `
);

const HeaderText = styled.h3(
  () => css`
    color: gray;
    font-size: 24px;
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
    @media (max-width: 560px) {
      margin-left: 0;
    }
  `
);

const SocialWrapper = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    @media (max-width: 560px) {
      flex-direction: column;
    }
  `
);
