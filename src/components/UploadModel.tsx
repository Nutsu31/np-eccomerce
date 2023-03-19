import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
const UploadModel = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data.image[0]);
    axios({
      method: "POST",
      url: "http://localhost:5001/add-new-model",
      headers: { "Content-Type": "multipart/form-data" },
      data: {
        name: data.name,
        price: data.price,
        size: data.size,
        color: data.color,
        image: data.image[0],
        data: Date.now(),
      },
    })
      .then((res) => console.log(res.data.finalModel))
      .catch((err) => console.log(err));
  });
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          type="file"
          {...register("image")}
          placeholder="ატვირთე სასურველი მოდელი"
        />
        <Input type="text" {...register("name")} placeholder="სახელი" />
        <Input type="number" {...register("price")} placeholder="ფასი" />
        <Input type="text" {...register("size")} placeholder="ზომა" />
        <Input type="text" {...register("color")} placeholder="ფერი" />
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default UploadModel;

const Form = styled.form(
  () => css`
    width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `
);

const Input = styled.input(
  () => css`
    width: 100%;
    height: 40px;
  `
);

const Button = styled.button(
  () => css`
    width: 100%;
    height: 40px;
    border: none;
    background-color: gray;
  `
);
