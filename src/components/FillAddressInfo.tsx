import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { CartType } from "./functions";
import styled, { css } from "styled-components";
import { Button } from "./TotalPayment";
import { FormControl, TextField } from "@mui/material";

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
      <h1>ადრესატის ინფორმაცია:</h1>
      <FormControl>
        <Form onSubmit={onSubmit}>
          <TextField type="text" {...register("firstname")} label="სახელი" />
          <TextField type="text" {...register("lastname")} label="გვარი" />
          <TextField type="text" {...register("city")} label="ქალაქი" />
          <TextField type="text" {...register("street")} label="ქუჩა" />
          <TextField
            type="number"
            {...register("phone")}
            label="საკონტაქტო ნომერი"
          />
          <TextField
            type="number"
            {...register("alt_phone")}
            label="სხვა საკონტაქტო პირის ნომერი"
          />
          <TextField
            type="text"
            {...register("postalCode")}
            label="საფოსტო კოდი მაგ:(თბილისი: 0162)"
          />
          <Button>გაგრძელება</Button>
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
    gap: 4px;
    flex-direction: column;
  `
);
