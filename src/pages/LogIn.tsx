import React, { useEffect, useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface singInType {
  status?: string;
  user?: string;
  error?: string;
}
const LogIn = () => {
  const [singIn, setSingIn] = useState<singInType>();

  const { register, reset, handleSubmit } = useForm();

  const navigate = useNavigate();

  const loginSuccess = () =>
    toast.success(`მოგესალმებით ${singIn?.user} წარმატებულ დღეს გისურვებ <3`);

  useEffect(() => {
    if (singIn?.status === "ok") {
      loginSuccess();
      setTimeout(() => {
        navigate("/admin-panel");
      }, 2000);
    }
  }, [singIn]);

  const onSubmit = handleSubmit((data) => {
    axios({
      method: "POST",
      url: "http://192.168.0.104:5001/admin",
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
      password: "",
    });
  });
  return (
    <Container>
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
      <h1>გაიარეთ ავტორიზაცია</h1>
      <FormControl>
        <Form onSubmit={onSubmit}>
          <TextField
            sx={{ width: { sm: 240, md: 300, lg: 400 } }}
            type="text"
            label="მომხმარებლის სახელი"
            {...register("username")}
          />
          <TextField
            sx={{ width: { sm: 240, md: 300, lg: 400 } }}
            type="password"
            label="მომხმარებლის პაროლი"
            {...register("password")}
          />
          {singIn?.status === "bad" ? (
            <span style={{ color: "red", fontSize: 14 }}>{singIn.error}</span>
          ) : null}
          <Button
            sx={{
              width: { sm: 240, md: 300, lg: 400 },
              backgroundColor: "text.secondary",
            }}
            variant="contained"
            type="submit"
          >
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
    align-items: center;
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
