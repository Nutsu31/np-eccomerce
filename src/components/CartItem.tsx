import React from "react";
import styled, { css } from "styled-components";
import { CartType, handleDelete, handleDiscount } from "./functions";

const CartItem = ({
  cartItem,
  setCartItem,
}: {
  cartItem: Array<CartType>;
  setCartItem: React.Dispatch<React.SetStateAction<CartType[]>>;
}) => {
  return (
    <>
      {cartItem?.map((item) => (
        <Container key={item.img}>
          <img
            src={`http://localhost:5001/uploads/${item.img}`}
            alt="model"
            width={100}
          />
          <p>{item.name}</p>
          <p>ზომა: {item.size}</p>
          <p>რაოდენობა: x{item.quantity}</p>
          <p>
            ფასი:{" "}
            {item.sale
              ? handleDiscount(item) * Number(item.quantity)
              : item.price * Number(item.quantity)}
            ₾
          </p>
          <Remove
            onClick={() => handleDelete({ id: item.id, cartItem, setCartItem })}
          >
            X
          </Remove>
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
    border-bottom: 2px solid #faf1e9;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  `
);

const Remove = styled.button(
  () => css`
    border: none;
    outline: none;
    cursor: pointer;
  `
);
