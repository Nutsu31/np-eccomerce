import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import {
  CartType,
  getItemsFromLocalStorage,
  getTotalPrice,
  getTotalSale,
  handleDelete,
  handleDiscount,
} from "../components/functions";
import TotalPayment from "../components/TotalPayment";

const Cart = () => {
  const [cartItem, setCartItem] = useState<Array<CartType>>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSale, setTotalSale] = useState(0);

  useEffect(() => {
    getTotalPrice({ cartItem, setTotalPrice });
  }, [cartItem]);
  useEffect(() => {
    getTotalSale({ cartItem, totalPrice, setTotalSale });
  }, [cartItem]);

  useEffect(() => {
    getItemsFromLocalStorage({ setCartItem });
  }, []);

  return (
    <>
      <h1>კალათა: </h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CartItem cartItem={cartItem} setCartItem={setCartItem} />
        </div>

        <TotalPayment totalPrice={totalPrice} totalSale={totalSale} />
      </div>
    </>
  );
};

export default Cart;
