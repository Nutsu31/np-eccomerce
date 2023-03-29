import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CheckoutsType, getCheckouts, getStatusColor } from "./functions";
// import { Details } from "./NewAdded";

const Checkouts = () => {
  const [checkout, setCheckout] = useState<Array<CheckoutsType>>();
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatusType | undefined>(
    undefined
  );
  console.log(orderStatus);
  useEffect(() => {
    getCheckouts({ setCheckout });
  }, [orderStatus, shouldUpdate]);

  interface OrderStatusType {
    id?: string;
    status?: string;
    models?: [
      {
        img: string;
        id: string;
        name: string;
        price: number;
        quantity: number;
        sale: number;
        size: string;
        path: string;
      }
    ];
  }
  async function updateCheckoutStatus(
    orderStatus: OrderStatusType | undefined
  ) {
    axios({
      method: "PUT",
      url: "http://localhost:5001/checkout",
      headers: { "Content-Type": "application/json" },
      data: {
        id: orderStatus?.id,
        status: orderStatus?.status,
        models: orderStatus?.models,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.matchedcount > 0) {
          setShouldUpdate(true);
        } else {
          setShouldUpdate(false);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    updateCheckoutStatus(orderStatus);
  }, [orderStatus]);

  return (
    <Container>
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {checkout?.map((item) => (
            <div
              style={{ border: "1px solid black", padding: 16 }}
              key={item.phone + Math.random()}
            >
              <p>შეკვეთა: </p>
              <p>შეკვეთის N: {item._id} </p>
              <p>
                სახელი: {item.firstname} {item.lastname}
              </p>
              <p>ნომერი: {item.phone}</p>
              <p>ქალაქი: {item.city}</p>
              <p>ქუჩა: {item.street}</p>
              <p>ალტ ნომერი: {item?.alt_phone}</p>
              <p>ფოსტა: {item?.postalCode}</p>
              <p>ფასი: {item?.totalPrice}₾</p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {item.model.map((model) => (
                  <div key={item._id + Math.random()}>
                    <img
                      src={`http://localhost:5001/uploads/${model.img}`}
                      alt="each model"
                      width={100}
                    />
                    <div>
                      <p>{model.name}</p>
                      <p>x{model.quantity}</p>
                      <p>ზომა: {model.size}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p
                style={{
                  background: getStatusColor(item.status),
                }}
              >
                სტატუსი: {item.status}
              </p>
              <div>
                <button
                  onClick={() => {
                    setOrderStatus({
                      id: item._id,
                      status: "inProgress",
                      models: item.model,
                    });
                    setShouldUpdate(true);
                  }}
                >
                  In Progress
                </button>
                <button
                  onClick={() => {
                    setOrderStatus({ id: item._id, status: "shipped" });
                    setShouldUpdate(true);
                  }}
                >
                  Shipped
                </button>
                <button
                  onClick={() => {
                    setOrderStatus({ id: item._id, status: "delivered" });
                    setShouldUpdate(true);
                  }}
                >
                  Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Checkouts;

const Container = styled.div(
  () => css`
    width: 100%;
    // min-height: 400px;
    display: flex;
    flex-direction: column;
  `
);

// const EachCheckout = styled.div(
//   () => css`
//     width: 100%;
//     // height: 100px;
//     display: flex;
//     justify-content: space-between;
//   `
// );
