import React, { useEffect, useState } from "react";

interface CartType {
  img: string;
  name: string;
  quantity: string;
  price: number;
}

const Cart = () => {
  const [cartItem, setCartItem] = useState<Array<CartType>>();
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("key")!);
    setCartItem(item);
  }, []);
  return (
    <div>
      {cartItem?.map((item) => (
        <div>
          <img
            src={`http://localhost:5001/uploads/${item.img}`}
            alt="model"
            width={100}
          />
          <p>{item.name}</p>
          <p>{item.quantity}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
