import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CheckoutsType, getCheckouts, getStatusColor } from "./functions";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DarkModeContext, darkTheme, lightTheme } from "../pages/Root";
import { Home, Person, ShoppingBag } from "@mui/icons-material";
import axios from "axios";

const Checkouts = ({
  setCheckout,
  checkout,
}: {
  checkout: CheckoutsType[] | undefined;
  setCheckout: React.Dispatch<
    React.SetStateAction<CheckoutsType[] | undefined>
  >;
}) => {
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    getCheckouts({ setCheckout });
  }, [orderStatus]);

  const dark = useContext(DarkModeContext);
  const handleSubmit = (item: CheckoutsType) => {
    axios({
      method: "PUT",
      url: "http://192.168.0.104:5001/checkout",
      headers: { "Content-Type": "application/json" },
      data: {
        id: item?._id,
        status: orderStatus,
        models: item?.model,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: SelectChangeEvent) => {
    e.preventDefault();
    setOrderStatus(e.target.value as string);
  };
  console.log(orderStatus);

  return (
    <Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <Typography
          component={"span"}
          sx={{ fontSize: { xs: 14, sm: 16, md: 18, lg: 22 }, fontWeight: 600 }}
        >
          Order Details
        </Typography>
        {checkout?.map((item) =>
          item.status !== "delivered" && item.status !== "canceled" ? (
            <Box
              key={Math.random() * Math.random()}
              sx={{
                width: "100%",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                backgroundColor: dark ? "#484D58" : "#F0F0F1",
              }}
            >
              <Box
                key={Math.random() * Math.random()}
                sx={{
                  width: "100%",
                  height: 76,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: "16px" }}>
                  <Paragraph>OrderN: #{item.phone}</Paragraph>
                  <Typography
                    component={"p"}
                    sx={{
                      width: 100,
                      height: 30,
                      fontSize: 14,
                      backgroundColor: getStatusColor(item.status),
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    {item.status}
                  </Typography>
                </Box>
                <FormControl>
                  <form onSubmit={() => handleSubmit(item)}>
                    <InputLabel>სტატუსის შეცვლა</InputLabel>
                    <Select
                      sx={{
                        width: { xs: 100, sm: 140, md: 160, lg: 200 },
                        marginRight: 2,
                      }}
                      label="სტატუსის შეცვლა"
                      value={orderStatus}
                      id="status"
                      onChange={(e: SelectChangeEvent) => handleChange(e)}
                    >
                      <MenuItem value="canceled">გაუქმება</MenuItem>
                      <MenuItem value="inProgress">პროცესშია</MenuItem>
                      <MenuItem value="shipped">გაიგზავნა</MenuItem>
                      <MenuItem value="delivered">ჩაბარებულია</MenuItem>
                    </Select>
                    <Button variant="contained" type="submit">
                      შენახვა
                    </Button>
                  </form>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: { sm: 348, md: 400, lg: 460, xl: 540 },
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    height: 192,
                    padding: "16px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <Box>
                    <IconDiv>
                      <Person />
                    </IconDiv>
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
                      მომხმარებელი
                    </Typography>
                    <Typography component="p">
                      სახელი:
                      {item.firstname} {item.lastname}
                    </Typography>
                    <Typography component="p">
                      ტელ: {item.phone} ალტ. ტელ: {item.alt_phone}
                    </Typography>
                    <Typography component="p"></Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { sm: 348, md: 400, lg: 460, xl: 540 },
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    height: 192,
                    padding: "16px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <Box>
                    <IconDiv>
                      <ShoppingBag />
                    </IconDiv>
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
                      შეკვეთა:
                    </Typography>
                    <Typography component="p">
                      გზავნილის ტიპი: Georgian Post
                    </Typography>
                    <Typography component="p">
                      გადახდის ტიპი: TBC ? CASH
                    </Typography>
                    <Typography component="p">
                      სტატუსი: {item.status}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { sm: 348, md: 400, lg: 460, xl: 540 },
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                    height: 192,
                    padding: "16px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <Box>
                    <IconDiv>
                      <Home />
                    </IconDiv>
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
                      მისამართი:
                    </Typography>
                    <Typography component="p">
                      მისამართი:
                      {item.street}
                    </Typography>
                    <Typography component="p">
                      ქალაქი:
                      {item.city}
                    </Typography>
                    <Typography component="p">
                      საფოსტო ი:
                      {item.postalCode}
                    </Typography>
                    <Typography component="p">
                      ტელ: {item.phone} ან {item.alt_phone}
                    </Typography>
                    <Typography component="p"></Typography>
                  </Box>
                </Box>
              </Box>
              <Typography>Product</Typography>
              {item.model.map((i) => (
                <>
                  <Box
                    key={Math.random() * Date.now()}
                    sx={{
                      width: "100%",
                      height: 60,
                      borderRadius: "10px",
                      padding: "0 8px",
                      margin: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: dark
                        ? darkTheme.palette.background.default
                        : lightTheme.palette.background.default,
                    }}
                  >
                    <img
                      src={i.img[0]}
                      alt="model"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "4px",
                      }}
                    />
                    <Typography>დასახელება: {i.name}</Typography>
                    <Typography>ზომა: {i.size}</Typography>
                    <Typography>რაოდენობა: x{i.quantity}</Typography>
                    <Typography>ფასი: ₾{i.price}</Typography>
                    <Typography>ფასდაკლება: {i.sale}%</Typography>
                  </Box>
                </>
              ))}
            </Box>
          ) : null
        )}
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

const IconDiv = styled.div(
  () => css`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #23f;
    color: white;
  `
);
