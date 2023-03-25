import React, { useEffect, useState } from "react";
import {
  CartType,
  getItemsFromLocalStorage,
  getTotalPrice,
  handleDelete,
  handleDiscount,
} from "../components/functions";

const Cart = () => {
  const [cartItem, setCartItem] = useState<Array<CartType>>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getTotalPrice({ cartItem, setTotalPrice });
  });

  useEffect(() => {
    getItemsFromLocalStorage({ setCartItem });
  }, []);
  return (
    <>
      <h1>კალათა: </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {cartItem?.map((item) => (
          <div
            style={{ display: "flex", gap: 100, background: "#e7e0d4" }}
            key={item.img}
          >
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
            <button
              onClick={() =>
                handleDelete({ id: item.id, cartItem, setCartItem })
              }
            >
              წაშლა
            </button>
          </div>
        ))}
        <h1 style={{ width: "100%", textAlign: "right" }}>
          სულ: {totalPrice}₾
        </h1>
      </div>
    </>
  );
};

export default Cart;
