import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { CheckoutsType, orderTracker } from "../components/functions";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Details } from "../components/NewAdded";
import StatusBar from "../components/StatusBar";
import { TextField } from "@mui/material";

function getStatus({ status }: { status: string }) {
  switch (status) {
    case "Order Placed":
      return "ველოდებით დადასტურებას!";
    case "inProgress":
      return "შეკვეთა დადასტურებულია!";
    case "shipped":
      return "შეკვეთა გამოგზავნილია!";
    case "delivered":
      return "შეკვეთა ჩაბარებულია!";
  }
}

const TrackCheckout = () => {
  const [order, setOrder] = useState<CheckoutsType[] | undefined>(undefined);
  const [findWithNumber, setFindWithNumber] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const { pathname } = useLocation();
  const notify = () => toast.info("შეკვეთა იძებნება გთხოვთ მოიცადოთ!");

  useEffect(() => {
    orderTracker({ setOrder, pathname });
  }, []);

  const onSubmit = handleSubmit((data) => {
    notify();
    setTimeout(() => {
      setFindWithNumber(data.phone);
    }, 3500);
    reset({ phone: "" });
  });
  const findOrder = order?.find(
    (item) => item.phone.toString() === findWithNumber
  );
  return (
    <Container>
      <div>
        <form onSubmit={onSubmit}>
          <TextField
            type="text"
            {...register("phone")}
            style={{ width: 380, height: 40 }}
            placeholder="შეკვეთის ძებნა (ტელ)"
          />
          <button
            style={{
              width: 40,
              height: 40,
              fontSize: 18,
              border: "none",
              background: "none",
            }}
          >
            <FaSearch />
          </button>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {findOrder ? (
          <>
            <DetailsWrapper>
              <HeaderText> შეკვეთის დეტალები:</HeaderText>
              <OrderNomDiv>
                <Details>შეკვეთის ნომერი: #{findOrder._id}</Details>
                <Details>ჯამი: {findOrder.totalPrice}₾</Details>
              </OrderNomDiv>
              {/* status bar */}
              <StatusBar status={findOrder.status} />
              {/* status bar */}
              <IsStatusOk>
                <Details>სტატუსი: {getStatus(findOrder)}</Details>
              </IsStatusOk>
            </DetailsWrapper>
            <div>
              {findOrder?.model.map((item) => (
                <CheckoutDetailsWrapper key={item.id}>
                  <img
                    src={`http://localhost:5001/uploads/${item.img}`}
                    width={100}
                    alt=""
                  />
                  <div>
                    <h4>პროდუქტის შესახებ:</h4>
                    <p>სახელი: {item.name}</p>
                    <p>ზომა: {item.size}</p>
                    <p>რაოდენობა: x{item.quantity}</p>
                  </div>
                  <div>
                    <h4>გაიგზავნა მისამართზე:</h4>
                    <p>
                      {findOrder.firstname} {findOrder.lastname}
                    </p>
                    <p>{findOrder.city}</p>
                    <p>{findOrder.street}</p>
                    <p>{findOrder.phone}</p>
                  </div>
                </CheckoutDetailsWrapper>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </Container>
  );
};

export default TrackCheckout;

const Container = styled.div(
  () => css`
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
  `
);
const DetailsWrapper = styled.div(
  () => css`
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48px;
  `
);

const CheckoutDetailsWrapper = styled.div(
  () => css`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  `
);
const HeaderText = styled.h2(
  () => css`
    width: 100%;
    text-align: left;
  `
);

const OrderNomDiv = styled.div(
  () => css`
    width: 100%;
    min-height: 50px;
    padding: 0 16px;
    background: lightgray;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
);

const IsStatusOk = styled.div(
  () => css`
    width: 90%;
    min-height: 40px;
    padding: 0 16px;
    background: lightgray;
    display: flex;
    align-items: center;
    gap: 16px;
  `
);
