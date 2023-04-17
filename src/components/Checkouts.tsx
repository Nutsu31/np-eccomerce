import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import {
  CheckoutsType,
  getCheckouts,
  getStatusColor,
  OrderStatusType,
  updateCheckoutStatus,
} from "./functions";
import { Button } from "@mui/material";
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

  useEffect(() => {
    getCheckouts({ setCheckout });
  }, [orderStatus, shouldUpdate]);

  useEffect(() => {
    updateCheckoutStatus({ orderStatus, setShouldUpdate });
  }, [orderStatus, checkout]);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        {checkout?.map((item) => (
          <div key={Math.random() * Math.random() * Math.random()}>
            {item.status !== "delivered" && item.status !== "canceled" ? (
              <div
                style={{
                  border: "1px solid black",
                  padding: 16,
                  background: getStatusColor(item.status),
                }}
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
            {item.status !== "delivered" && item.status !== "canceled" ? (
              <Paragraph>სტატუსი: {item.status} </Paragraph>
            ) : null}
            {item.status !== "delivered" && item.status !== "canceled" ? (
              <form>
                <Button
                  variant="outlined"
                  type="submit"
                  color="error"
                  onClick={() => {
                    setOrderStatus({
                      id: item._id,
                      status: "canceled",
                      models: item.model,
                    });
                  }}
                >
                  გაუქმებულია
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  onClick={() => {
                    setOrderStatus({
                      id: item._id,
                      status: "inProgress",
                      models: item.model,
                    });
                  }}
                >
                  პროცესშია
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOrderStatus({ id: item._id, status: "shipped" });
                  }}
                >
                  გზაშია
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => {
                    setOrderStatus({ id: item._id, status: "delivered" });
                  }}
                >
                  ჩაბარებულია
                </Button>
              </form>
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
    aling-items: flex-start;
    flex-wrap: wrap;
  `
);

const Paragraph = styled.p(
  () => css`
    font-weight: 600;
  `
);
