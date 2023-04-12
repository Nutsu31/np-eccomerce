import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { CartType } from "./functions";
import styled, { css } from "styled-components";
// import { Button } from "./TotalPayment";
import { FormControl, TextField, Button } from "@mui/material";
import { HeaderText } from "../pages/Cart";

const FillAddressInfo = ({
  totalPrice,
  cartItem,
}: {
  totalPrice: number;
  cartItem: Array<CartType>;
}) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    data.totalPrice = totalPrice;
    data.model = cartItem;
    data._id = Date.now().toString();
    data.status = "Order Placed";
    console.log(data);
    axios({
      method: "POST",
      url: "http://localhost:5001/checkout",
      headers: { "Content-Type": "application/json" },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        totalPrice: data.totalPrice,
        _id: data._id,
        model: data.model,
        city: data.city,
        phone: data.phone,
        alt_phone: data.alt_phone,
        postalCode: data.postalCode,
        status: data.status,
        street: data.street,
      },
    })
      .then((res) => console.log(res.data.finalModel))
      .catch((err) => console.log(err));
    reset({
      firstname: "",
      lastname: "",
      city: "",
      street: "",
      phone: "",
      alt_phone: "",
      postalCode: "",
    });
    localStorage.clear();
  });
  return (
    <FormWrapper>
      <HeaderText>ადრესატის ინფორმაცია:</HeaderText>
      <FormControl>
        <Form onSubmit={onSubmit}>
          <TextField
            sx={{ width: { sm: 250, md: 350, lg: 450 } }}
            type="text"
            {...register("firstname")}
            label="სახელი"
          />
          <TextField
            sx={{ width: { sm: 250, md: 350, lg: 450 } }}
            type="text"
            {...register("lastname")}
            label="გვარი"
          />
          <TextField
            sx={{ width: { sm: 250, md: 350, lg: 450 } }}
            type="text"
            {...register("city")}
            label="ქალაქი"
          />
          <TextField
            sx={{ width: { sm: 250, md: 350, lg: 450 } }}
            type="text"
            {...register("street")}
            label="ქუჩა"
          />
          <TextField
            sx={{ width: { sm: 250, md: 350, lg: 450 } }}
            type="number"
            {...register("phone")}
            label="საკონტაქტო ნომერი"
          />
          <TextField
            sx={{ width: { sm: 250, md: 350, lg: 450 } }}
            type="number"
            {...register("alt_phone")}
            label="სხვა საკონტაქტო პირის ნომერი"
          />
          <TextField
            sx={{ width: { sm: 250, md: 350, lg: 450 } }}
            type="text"
            {...register("postalCode")}
            label="საფოსტო კოდი მაგ:(თბილისი: 0162)"
          />
          <Button
            type="submit"
            sx={{ width: { sm: 250, md: 350, lg: 450 } }}
            variant="contained"
          >
            გაგრძელება
          </Button>
        </Form>
      </FormControl>
    </FormWrapper>
  );
};

export default FillAddressInfo;
const FormWrapper = styled.div(
  () => css`
    width: 100%;
    height: 520px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
  `
);
const Form = styled.form(
  () => css`
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex-direction: column;
  `
);
