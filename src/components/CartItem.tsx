import React from "react";
import styled, { css } from "styled-components";
import { CartType, handleDelete, handleDiscount } from "./functions";
import { Details } from "./NewAdded";
import { Close } from "@mui/icons-material";

const CartItem = ({
  cartItem,
  setCartItem,
}: {
  cartItem: Array<CartType>;
  setCartItem: React.Dispatch<React.SetStateAction<CartType[]>>;
}) => {
  return (
    <>
      {cartItem.length > 0 ? null : <p>კალათა ცარიელია</p>}
      {cartItem?.map((item) => (
        <Container key={item.img}>
          <img src={item.img[0]} alt="model" width={100} />
          <Details>{item.name}</Details>
          <Details>ზომა: {item.size}</Details>
          <Details>რაოდენობა: x{item.quantity}</Details>
          <Details>
            ფასი:{" "}
            {item.sale
              ? handleDiscount(item) * Number(item.quantity)
              : item.price * Number(item.quantity)}
            ₾
          </Details>
          <Close
            onClick={() => handleDelete({ id: item.id, cartItem, setCartItem })}
          ></Close>
        </Container>
      ))}
    </>
  );
};

export default CartItem;

const Container = styled.div(
  () => css`
    width: 800px;
    height: 186px;
    padding: 16px;
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  `
);
