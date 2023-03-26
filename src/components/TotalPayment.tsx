import React from "react";
import styled, { css } from "styled-components";

const TotalPayment = ({
  totalPrice,
  totalSale,
}: {
  totalPrice: number;
  totalSale: number;
}) => {
  return (
    <>
      {totalPrice > 0 ? (
        <Container>
          <p>რაოდენობა: 3</p>
          <p>ფასდაკლება: -{Math.hypot(totalSale)}₾</p>
          <div></div>
          <p>მიწოდება: თბილის 4₾ საქართველო: 7₾</p>
          <div></div>
          <p>ჯამი: {Math.hypot(totalPrice)}₾</p>
          <button>განაგრძე გამოწერა</button>
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
