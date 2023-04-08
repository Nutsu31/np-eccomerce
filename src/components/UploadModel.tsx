import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Send, Upload } from "@mui/icons-material";

const UploadModel = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      id: Date.now(),
      name: "",
      price: "",
      size: "",
      color: "",
      image: [],
      category: "",
      style: "",
      storage: 0,
      gender: "",
      sale: 0,
      collections: "",
      desc: "",
    },
  });
  const [sale, setSale] = useState(false);

  const notify = () => toast.success("მოდელი წარმატებით დაემატა!");

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    notify();
    const formData = new FormData();
    for (let i = 0; i < data.image.length; i++) {
      formData.append("image", data.image[i]);
    }
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("color", data.color);
    formData.append("category", data.category);
    formData.append("style", data.style);
    formData.append("storage", data.storage.toString());
    formData.append("gender", data.gender);
    formData.append("size", data.size);
    formData.append("sale", data.sale.toString());
    formData.append("collections", data.collections);
    formData.append("desc", data.desc);

    const res = axios.post("http://localhost:5001/add-new-model", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    // axios({
    //   method: "POST",
    //   url: "http://localhost:5001/add-new-model",
    //   headers: { "Content-Type": "multipart/form-data" },
    //   data: {
    //     _id: Date.now(),
    //     name: data.name,
    //     price: data.price,
    //     size: data.size,
    //     color: data.color,
    //     image: formData,
    //     category: data.category,
    //     style: data.style,
    //     storage: data.storage,
    //     gender: data.gender,
    //     sale: data.sale,
    //     collections: data.collections,
    //   },
    // })
    //   .then((res) => console.log(res.data.finalModel))
    //   .catch((err) => console.log(err));
    reset({
      name: "",
      price: "",
      size: "",
      color: "",
      category: "",
      style: "",
      image: [],
      storage: 0,
      gender: "",
      sale: 0,
      collections: "",
    });
  });
  return (
    <>
      <Form onSubmit={onSubmit}>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Button fullWidth sx={{ height: 40 }} variant="contained">
          <Upload />
          <input
            type="file"
            multiple
            {...register("image")}
            placeholder="ატვირთე სასურველი მოდელი"
          />
        </Button>
        <TextField
          fullWidth
          type="text"
          {...register("name")}
          placeholder="სახელი"
        />
        <TextField
          fullWidth
          type="number"
          {...register("price")}
          placeholder="ფასი"
        />
        <TextField
          fullWidth
          type="text"
          {...register("color")}
          placeholder="ფერი"
        />
        <TextField
          fullWidth
          type="number"
          {...register("storage")}
          placeholder="მარაგი"
        />
        <Select fullWidth {...register("size")}>
          <MenuItem>აირჩიე ზომა</MenuItem>
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="L">L</MenuItem>
          <MenuItem value="XL">XL</MenuItem>
        </Select>
        <Select fullWidth {...register("collections")}>
          <MenuItem>კოლექცია</MenuItem>
          <MenuItem value="new">ახალი კოლექცია</MenuItem>
        </Select>
        <Select fullWidth {...register("category")}>
          <MenuItem>კატეგორია</MenuItem>
          <MenuItem value="Suits">პიჯაკი</MenuItem>
          <MenuItem value="T-Shirts">მაისური</MenuItem>
        </Select>
        <Select fullWidth {...register("style")}>
          <MenuItem>სტილი</MenuItem>
          <MenuItem value="Classic">კლასიკური</MenuItem>
          <MenuItem value="Urban">ყოველდღიური</MenuItem>
        </Select>
        <Select fullWidth {...register("gender")}>
          <MenuItem>აირჩიე სქესი</MenuItem>
          <MenuItem value="women">ქალი</MenuItem>
          <MenuItem value="men">კაცი</MenuItem>
          <MenuItem value="unisex">Unisex</MenuItem>
        </Select>
        <TextField
          fullWidth
          placeholder="აღწერა პროდუქტის"
          {...register("desc")}
        />
        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) =>
                    e.target.checked ? setSale(true) : setSale(false)
                  }
                />
              }
              label="ფასდაკლება"
            />
          </FormGroup>
          {sale ? (
            <TextField
              fullWidth
              type="text"
              {...register("sale")}
              placeholder="ფასდაკლების პროცენტი"
            />
          ) : null}
        </div>
        <Button variant="contained" fullWidth type="submit">
          Submit
          <Send />
        </Button>
      </Form>
    </>
  );
};

export default UploadModel;

const Form = styled.form(
  () => css`
    width: 500px;
    height: 900px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
  `
);
