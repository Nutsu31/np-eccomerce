import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  CheckoutsType,
  getStatusColor,
  orderTracker,
} from "../components/functions";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Details } from "../components/NewAdded";
import StatusBar from "../components/StatusBar";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Search } from "@mui/icons-material";

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
  const showStatusBar = useMediaQuery("(max-width:820px)");
  const checkoutDetailsDirection = useMediaQuery("(max-width:670px)");
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
      <div style={{ width: "100%" }}>
        <form
          onSubmit={onSubmit}
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            type="text"
            {...register("phone")}
            style={{ width: 380, height: 40 }}
            placeholder="შეკვეთის ძებნა (ტელ)"
          />
          <Button type="submit">
            <Search />
          </Button>
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
              <Box sx={{ width: "100%", backgroundColor: "text.disabled" }}>
                <OrderNomDiv>
                  <Details>შეკვეთის ნომერი: #{findOrder._id}</Details>
                  <Details>ჯამი: {findOrder.totalPrice}₾</Details>
                </OrderNomDiv>
              </Box>
              {/* status bar */}
              {showStatusBar ? null : <StatusBar status={findOrder.status} />}
              {/* status bar */}
              <Box sx={{ width: "100%", backgroundColor: "text.disabled" }}>
                <IsStatusOk>
                  <Details>
                    სტატუსი:{" "}
                    <Typography color={getStatusColor(findOrder.status)}>
                      {getStatus(findOrder)}
                    </Typography>
                  </Details>
                </IsStatusOk>
              </Box>
            </DetailsWrapper>
            <Box
              sx={{
                width: "100%",
              }}
            >
              {findOrder?.model.map((item) => (
                <CheckoutDetailsWrapper key={item.id}>
                  <img src={item.img[0]} width={150} alt="" />
                  <Box
                    sx={{
                      height: 200,
                      textAlign: "left",
                      width: "16rem",
                    }}
                  >
                    <Typography variant="h5">პროდუქტის შესახებ:</Typography>
                    <p>სახელი: {item.name}</p>
                    <p>ზომა: {item.size}</p>
                    <p>რაოდენობა: x{item.quantity}</p>
                  </Box>
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="h5">გაიგზავნა მისამართზე:</Typography>
                    <p>
                      მიმღების სახელი: {findOrder.firstname}{" "}
                      {findOrder.lastname}
                    </p>
                    <p>ქალაქი: {findOrder.city}</p>
                    <p>ქუჩა: {findOrder.street}</p>
                    <p>ტელეფონი: {findOrder.phone}</p>
                  </Box>
                </CheckoutDetailsWrapper>
              ))}
            </Box>
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
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    margin: 24px 0;
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
    @media (max-width: 744px) {
      height: 300px;
    }
  `
);

const CheckoutDetailsWrapper = styled.div(
  () => css`
    width: 100%;
    padding: 16px;
    display: flex;
    gap: 48px;
    @media (max-width: 744px) {
      flex-direction: column;
      text-aling: left;
      gap: 24px;
    }
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  `
);

const IsStatusOk = styled.div(
  () => css`
    width: 100%;
    min-height: 40px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 16px;
  `
);
