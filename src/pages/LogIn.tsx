import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

interface singInType {
  status?: string;
  user?: string;
}
const LogIn = () => {
  const [singIn, setSingIn] = useState<singInType>();
  console.log(singIn);
  const { register, reset, handleSubmit } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (singIn?.status === "ok") {
      navigate("/admin-panel");
    }
  }, [singIn]);

  const onSubmit = handleSubmit((data) => {
    axios({
      method: "POST",
      url: "http://localhost:5001/admin",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: data.username,
        password: data.password,
      },
    })
      .then((res) => setSingIn(res.data))
      .catch((err) => console.log(err));
    reset({
      username: "",
      password: "",
    });
  });
  return (
    <Container>
      <h1>გაიარეთ ავტორიზაცია</h1>
      <FormControl>
        <Form onSubmit={onSubmit}>
          <TextField
            type="text"
            label="მომხმარებლის სახელი"
            {...register("username")}
          />
          <TextField
            type="password"
            label="მომხმარებლის პაროლი"
            {...register("password")}
          />
          <Button variant="contained" type="submit">
            ავტორიზაცია
          </Button>
        </Form>
      </FormControl>
    </Container>
  );
};

export default LogIn;

const Form = styled.form(
  () => css`
    width: 500px;
    height: 600px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  `
);

const Container = styled.section(
  () => css`
    width: 100%;
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
  `
);
