import React from "react";
import styled, { css } from "styled-components";
import { Details } from "./NewAdded";

const TotalPayment = ({
  totalPrice,
  totalSale,
  cartSize,
  setContinueCheckout,
}: {
  totalPrice: number;
  totalSale: number;
  cartSize: number;
  setContinueCheckout: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {totalPrice > 0 ? (
        <Container>
          <Details>რაოდენობა: {cartSize}</Details>
          <Details>ფასდაკლება: -{Math.hypot(totalSale)}₾</Details>
          <div></div>
          <Details>მიწოდება: თბილის 4₾ საქართველო: 7₾</Details>
          <div></div>
          <Details>ჯამი: {Math.hypot(totalPrice)}₾</Details>
          <button onClick={() => setContinueCheckout((curr) => !curr)}>
            შეკვეთის გაგრძელება
          </button>
        </Container>
      ) : null}
    </>
  );
};

export default TotalPayment;
const Container = styled.div(
  () => css`
    width: 400px;
    height: 300px;
    padding: 24px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `
);
