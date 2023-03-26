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

const Cart = () => {
  const [cartItem, setCartItem] = useState<Array<CartType>>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [cartSize, setCartSize] = useState(0);
  const [continueCheckout, setContinueCheckout] = useState(false);

  console.log(cartItem.length);
  useEffect(() => {
    getTotalPrice({ cartItem, setTotalPrice });
    setCartSize(cartItem.length);
  }, [cartItem]);
  useEffect(() => {
    getTotalSale({ cartItem, totalPrice, setTotalSale });
  }, [cartItem]);

  useEffect(() => {
    getItemsFromLocalStorage({ setCartItem });
  }, []);

  return (
    <>
      <h1
        style={{
          height: 60,
          margin: "24px 0",
          borderBottom: "1px solid black",
        }}
      >
        კალათა:{" "}
      </h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CartItem cartItem={cartItem} setCartItem={setCartItem} />
        </div>

        <TotalPayment
          totalPrice={totalPrice}
          totalSale={totalSale}
          cartSize={cartSize}
          setContinueCheckout={setContinueCheckout}
        />
      </div>
      {continueCheckout ? (
        <FillAddressInfo totalPrice={totalPrice} cartItem={cartItem} />
      ) : null}
      <WeRecomemdedModels />
    </>
  );
};

export default Cart;
