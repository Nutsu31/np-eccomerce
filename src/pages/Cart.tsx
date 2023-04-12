import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import FillAddressInfo from "../components/FillAddressInfo";
import {
  CartType,
  getItemsFromLocalStorage,
  getTotalPrice,
  getTotalSale,
} from "../components/functions";
import TotalPayment from "../components/TotalPayment";
import WeRecomemdedModels from "../components/WeRecomemdedModels";
import styled, { css } from "styled-components";

const Cart = () => {
  const [cartItem, setCartItem] = useState<Array<CartType>>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [continueCheckout, setContinueCheckout] = useState(false);
  useEffect(() => {
    getTotalPrice({ cartItem, setTotalPrice });
  }, [cartItem]);
  useEffect(() => {
    getTotalSale({ cartItem, totalPrice, setTotalSale });
  }, [cartItem, totalPrice]);
  useEffect(() => {
    getItemsFromLocalStorage({ setCartItem });
  }, []);

  return (
    <>
      <HeaderText>კალათა: </HeaderText>
      <CheckoutAndPaymentWrapper
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <CheckoutWrapper style={{ display: "flex", flexDirection: "column" }}>
          <CartItem cartItem={cartItem} setCartItem={setCartItem} />
        </CheckoutWrapper>

        <TotalPayment
          cartItem={cartItem}
          totalPrice={totalPrice}
          totalSale={totalSale}
          cartSize={cartItem.length}
          continueCheckout={continueCheckout}
          setContinueCheckout={setContinueCheckout}
        />
      </CheckoutAndPaymentWrapper>
      {continueCheckout ? (
        <FillAddressInfo totalPrice={totalPrice} cartItem={cartItem} />
      ) : null}
      <WeRecomemdedModels />
    </>
  );
};

export default Cart;

export const HeaderText = styled.h1(
  () => css`
    height: 60px;
    margin: 24px 0;
    border-bottom: 1px solid lightgray;
    @media (max-width: 600px) {
      font-size: 24px;
    }
  `
);

const CheckoutAndPaymentWrapper = styled.div(
  () => css`
    display: flex;
    justify-content: space-evenly;
    @media (max-width: 1450px) {
      flex-wrap: wrap;
      gap: 24px;
      margin-bottom: 24px;
    }
  `
);
const CheckoutWrapper = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
  `
);
