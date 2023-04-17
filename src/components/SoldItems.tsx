import React, { useContext } from "react";
import { CheckoutsType, getStatusColor } from "./functions";
import {
  AttachMoney,
  ShoppingBasket,
  ShoppingBasketOutlined,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Box } from "@mui/system";
import { DarkModeContext } from "../pages/Root";
import { Typography } from "@mui/material";

const SoldItems = ({ checkout }: { checkout: CheckoutsType[] | undefined }) => {
  const totalSoldPrice = checkout?.map((item) => item.totalPrice);
  const countSoldPrice = totalSoldPrice?.reduce((x, y) => x + y);
  const totalCheckouts = checkout?.length;

  const getAllArraysTogether = checkout?.map((item) =>
    item.model.map((i) => i.quantity)
  );
  const totalSold = getAllArraysTogether?.flat().reduce((x, y) => x + y);

  const checkoutCanceled = checkout?.filter((i) => i.status === "canceled");
  const canceledCheckoutSum = checkoutCanceled?.map((i) => i.totalPrice);
  const totalCanceledSum = canceledCheckoutSum?.reduce((x, y) => x + y);

  const dark = useContext(DarkModeContext);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 24,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <OrderBox dark={dark}>
          <p
            style={{
              fontSize: 24,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            სულ შეკვეთა:
            <span style={{ color: "#00BDB0", fontSize: 36, fontWeight: 700 }}>
              <Box
                sx={{
                  backgroundColor: "#4A69e2",
                  width: 40,
                  height: 40,
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "24px",
                }}
              >
                <ShoppingBasketOutlined
                  sx={{
                    fontSize: { sm: 16, md: 20, lg: 24, xl: 30 },
                    color: "text.secondary",
                  }}
                />
              </Box>
              {totalCheckouts}
            </span>
          </p>
        </OrderBox>
        <OrderBox dark={dark}>
          <p
            style={{
              fontSize: 24,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            ჯამი:
            <span style={{ fontSize: 36, fontWeight: 700 }}>
              <Box
                sx={{
                  backgroundColor: "#4A69e2",
                  width: 40,
                  height: 40,
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "24px",
                }}
              >
                <ShoppingBasketOutlined
                  sx={{
                    fontSize: { sm: 16, md: 20, lg: 24, xl: 30 },
                    color: "text.secondary",
                  }}
                />
              </Box>
              ₾{countSoldPrice! - totalCanceledSum!}
            </span>
          </p>
        </OrderBox>
        <OrderBox dark={dark}>
          <p
            style={{
              fontSize: 24,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            გაყიდული:
            <span style={{ color: "#00BDB0", fontSize: 36, fontWeight: 700 }}>
              <Box
                sx={{
                  backgroundColor: "#4A69e2",
                  width: 40,
                  height: 40,
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "24px",
                }}
              >
                <ShoppingBasketOutlined
                  sx={{
                    fontSize: { sm: 16, md: 20, lg: 24, xl: 30 },
                    color: "text.secondary",
                  }}
                />
              </Box>
              {totalSold! - checkoutCanceled?.length!}ც
            </span>
          </p>
        </OrderBox>
        <OrderBox dark={dark}>
          <p
            style={{
              fontSize: 24,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            გაუქმებული:
            <span style={{ color: "tomato", fontSize: 36, fontWeight: 700 }}>
              <Box
                sx={{
                  backgroundColor: "#4A69e2",
                  width: 40,
                  height: 40,
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "24px",
                }}
              >
                <ShoppingBasketOutlined
                  sx={{
                    fontSize: { sm: 16, md: 20, lg: 24, xl: 30 },
                    color: "text.secondary",
                  }}
                />
              </Box>
              {totalCanceledSum}₾ , {checkoutCanceled?.length}ც
            </span>
          </p>
        </OrderBox>
      </div>
      <Box
        sx={{
          width: "100%",
          borderRadius: 10,
          margin: 8,
          padding: "24px",
          backgroundColor: dark ? "#484D58" : "#F0F0F1",
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {checkout?.map((item) => (
          <Box
            key={Math.random() * Math.random() * Math.random()}
            sx={{
              display: "flex",
              width: "100%",
              borderBottom: "1px solid ",

              height: 70,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {item.status === "delivered" || item.status === "canceled" ? (
              <>
                <p>
                  {item.firstname} {item.lastname}
                </p>

                <p>
                  {item.phone} {item.alt_phone}
                </p>
                <p>{item.totalPrice}₾</p>
                <Typography
                  component="p"
                  sx={{
                    color: item.status === "delivered" ? "#00BDB0" : "tomato",
                  }}
                >
                  {item.status}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "600px",
                    height: "70px",
                  }}
                >
                  {item.model.map((model) => (
                    <>
                      <img
                        src={model.img[0]}
                        alt="model"
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                      />

                      <p>{model.price}₾</p>
                      <p>
                        რაოდენობა: x{model.quantity} ზომა: {model.size}
                      </p>
                    </>
                  ))}
                </div>
              </>
            ) : null}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default SoldItems;

const OrderBox = styled.div(
  ({ dark }: { dark?: boolean }) => css`
    width: 300px;
    height: 160px;
    padding: 16px;
    margin-top: 24px;
    background: ${dark ? "#484D58" : "#F0F0F1"};
    border-radius: 20px;
  `
);
