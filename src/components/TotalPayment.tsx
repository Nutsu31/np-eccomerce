import React from "react";
import styled, { css } from "styled-components";
import { Details } from "./NewAdded";
import { CartType } from "./functions";
import {
  Link,
  // Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
const TotalPayment = ({
  totalPrice,
  totalSale,
  cartSize,
  cartItem,
  continueCheckout,
  setContinueCheckout,
}: {
  cartItem: CartType[];
  continueCheckout: boolean;
  totalPrice: number;
  totalSale: number;
  cartSize: number;
  setContinueCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {totalPrice > 0 ? (
        <Container>
          <PriceWrapper>
            <Details>ძველი ფასი: {`(რაოდენობა: ${cartSize} )`}</Details>
            <Details>₾{Math.round(totalPrice + totalSale)}</Details>
          </PriceWrapper>
          <PriceWrapper>
            <Details>ფასდაკლება:</Details>
            <Details> -₾{Math.round(totalSale)}</Details>
          </PriceWrapper>

          <div
            style={{ width: "100%", height: 1, background: "lightgray" }}
          ></div>
          <PriceWrapper>
            <Details>მიწოდება:</Details>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Details>თბილისი: 4₾</Details>
              <Details>საქართველო: 7₾</Details>
            </div>
          </PriceWrapper>
          <div
            style={{ width: "100%", height: 1, background: "lightgray" }}
          ></div>
          <PriceWrapper>
            <Details>ჯამი: </Details>
            <Details>₾{Math.round(totalPrice)} </Details>
          </PriceWrapper>
          <Button
            onClick={() => {
              setContinueCheckout(!continueCheckout);
              {
                continueCheckout
                  ? scroll.scrollToTop(100)
                  : scroll.scrollMore(500);
              }
            }}
          >
            შეკვეთის გაგრძელება
          </Button>
        </Container>
      ) : null}
    </>
  );
};

export default TotalPayment;
const Container = styled.div(
  () => css`
    width: 400px;
    height: 350px;
    padding: 24px;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 1px 1px 6px gray;
  `
);

const PriceWrapper = styled.div(
  () => css`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
);

export const Button = styled.button(
  () => css`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    background: #039be5;
    border: none;
  `
);
