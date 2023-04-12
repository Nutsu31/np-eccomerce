import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import {
  CheckoutsType,
  getCheckouts,
  getStatusColor,
  OrderStatusType,
  updateCheckoutStatus,
} from "./functions";
// import { Details } from "./NewAdded";

const Checkouts = ({
  setCheckout,
  checkout,
}: {
  checkout: CheckoutsType[] | undefined;
  setCheckout: React.Dispatch<
    React.SetStateAction<CheckoutsType[] | undefined>
  >;
}) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatusType | undefined>(
    undefined
  );
  console.log(orderStatus);

  useEffect(() => {
    getCheckouts({ setCheckout });
  }, [orderStatus, shouldUpdate]);

  useEffect(() => {
    updateCheckoutStatus({ orderStatus, setShouldUpdate });
  }, [orderStatus, checkout]);

  return (
    <Container>
      <div style={{ display: "flex", gap: 24 }}>
        {checkout?.map((item) => (
          <div key={Math.random() * Math.random() * Math.random()}>
            {item.status !== "delivered" ? (
              <div
                style={{ border: "1px solid black", padding: 16 }}
                key={item.phone + Math.random()}
              >
                <Paragraph>შეკვეთის N: {item._id} </Paragraph>
                <Paragraph>
                  სახელი: {item.firstname} {item.lastname}
                </Paragraph>
                <Paragraph>ნომერი: {item.phone}</Paragraph>
                <Paragraph>ქალაქი: {item.city}</Paragraph>
                <Paragraph>ქუჩა: {item.street}</Paragraph>
                <Paragraph>ალტ ნომერი: {item?.alt_phone}</Paragraph>
                <Paragraph>ფოსტა: {item?.postalCode}</Paragraph>
                <Paragraph>ფასი: {item?.totalPrice}₾</Paragraph>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  {item.model.map((model) => (
                    <div key={item._id + Math.random()}>
                      <img src={model.img[0]} alt="each model" width={100} />
                      <div>
                        <Paragraph>სახელი: {model.name}</Paragraph>
                        <Paragraph>რაოდენობა: x{model.quantity}</Paragraph>
                        <Paragraph>ზომა: {model.size}</Paragraph>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {item.status !== "delivered" ? (
              <Paragraph
                style={{
                  background: getStatusColor(item.status),
                }}
              >
                სტატუსი: {item.status}{" "}
              </Paragraph>
            ) : null}
            {item.status !== "delivered" ? (
              <div>
                <button
                  onClick={() => {
                    setOrderStatus({
                      id: item._id,
                      status: "inProgress",
                      models: item.model,
                    });
                    setShouldUpdate(!shouldUpdate);
                  }}
                >
                  In Progress
                </button>
                <button
                  onClick={() => {
                    setOrderStatus({ id: item._id, status: "shipped" });
                    setShouldUpdate(!shouldUpdate);
                  }}
                >
                  Shipped
                </button>
                <button
                  onClick={() => {
                    setOrderStatus({ id: item._id, status: "delivered" });
                    setShouldUpdate(!shouldUpdate);
                  }}
                >
                  Delivered
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Checkouts;

const Container = styled.div(
  () => css`
    width: 100%;
    display: flex;
  `
);

const Paragraph = styled.p(
  () => css`
    font-weight: 600;
  `
);
