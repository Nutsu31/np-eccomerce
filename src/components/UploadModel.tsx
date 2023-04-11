import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { Send, Upload } from "@mui/icons-material";

const UploadModel = () => {
  const { register, handleSubmit, reset } = useForm();
  const [sale, setSale] = useState(false);
  const notifySucc = () => toast.success("წარმატებით აიტვირთა");
  const notifyErr = () => toast.error("დამატება უარყოფილია შეავსეთ ყველა ველი");

  const onSubmit = handleSubmit((data) => {
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

    const res = axios
      .post("http://localhost:5001/add-new-model", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => notifySucc())
      .catch(() => notifyErr());
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
      desc: "",
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
            {...register("image", { required: true })}
            placeholder="ატვირთე სასურველი მოდელი"
          />
        </Button>
        <TextField
          fullWidth
          type="text"
          {...register("name", { required: true })}
          label="სახელი"
        />
        <TextField
          fullWidth
          type="number"
          {...register("price", { required: true })}
          label="ფასი"
        />
        <TextField
          fullWidth
          type="text"
          {...register("color", { required: true })}
          label="ფერი"
        />
        <TextField
          fullWidth
          type="number"
          {...register("storage", { required: true })}
          label="მარაგი"
        />
        <Select
          fullWidth
          {...register("size", { required: true })}
          defaultValue={"initial value" || ""}
        >
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="L">L</MenuItem>
          <MenuItem value="XL">XL</MenuItem>
        </Select>
        <Select
          fullWidth
          {...register("collections", { required: true })}
          label="კოლექცია"
          defaultValue={"collections" || ""}
        >
          <MenuItem value="new">ახალი კოლექცია</MenuItem>
        </Select>
        <Select
          fullWidth
          {...register("category", { required: true })}
          defaultValue={"category" || ""}
          label="კატეგორია"
        >
          <MenuItem value="Suits">პიჯაკი</MenuItem>
          <MenuItem value="T-Shirts">მაისური</MenuItem>
        </Select>
        <Select
          fullWidth
          {...register("style", { required: true })}
          defaultValue={"style" || ""}
        >
          <MenuItem value="Classic">კლასიკური</MenuItem>
          <MenuItem value="Urban">ყოველდღიური</MenuItem>
        </Select>
        <Select
          fullWidth
          {...register("gender", { required: true })}
          defaultValue={"gender" || ""}
          label="airCie"
        >
          <MenuItem value="women">ქალი</MenuItem>
          <MenuItem value="men">კაცი</MenuItem>
          <MenuItem value="unisex">Unisex</MenuItem>
        </Select>
        <TextField
          label="აღწერა პროდუქტის"
          {...register("desc", { required: true })}
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
              label="ფასდაკლების პროცენტი"
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
