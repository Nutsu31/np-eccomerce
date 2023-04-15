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
      .post("http://192.168.0.104:5001/add-new-model", formData, {
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
        <Button
          fullWidth
          variant="contained"
          sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
        >
          <Upload />
          <input
            type="file"
            multiple
            {...register("image", { required: true })}
            placeholder="ატვირთე სასურველი მოდელი"
          />
        </Button>
        <TextField
          sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
          type="text"
          {...register("name", { required: true })}
          label="სახელი"
        />
        <TextField
          sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
          type="number"
          {...register("price", { required: true })}
          label="ფასი"
        />
        <TextField
          sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
          type="text"
          {...register("color", { required: true })}
          label="ფერი"
        />
        <TextField
          sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
          type="number"
          {...register("storage", { required: true })}
          label="მარაგი"
        />
        <FormControl>
          <InputLabel id="size">ზომა</InputLabel>
          <Select
            sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
            {...register("size", { required: true })}
            defaultValue={undefined || ""}
            id="size"
            label="ზომა"
          >
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="L">L</MenuItem>
            <MenuItem value="XL">XL</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="collection">კოლექცია</InputLabel>
          <Select
            sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
            {...register("collections", { required: true })}
            label="კოლექცია"
            defaultValue={undefined || ""}
            id="collection"
          >
            <MenuItem value="new">ახალი კოლექცია</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="category">კატეგორია</InputLabel>
          <Select
            sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
            {...register("category", { required: true })}
            defaultValue={undefined || ""}
            label="კატეგორია"
            id="category"
          >
            <MenuItem value="Suits">პიჯაკი</MenuItem>
            <MenuItem value="T-Shirts">მაისური</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="style">სტილი</InputLabel>
          <Select
            sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
            {...register("style", { required: true })}
            defaultValue={undefined || ""}
            id="style"
            label="სტილი"
          >
            <MenuItem value="Classic">კლასიკური</MenuItem>
            <MenuItem value="Urban">ყოველდღიური</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="gender">სქესი</InputLabel>
          <Select
            sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
            {...register("gender", { required: true })}
            defaultValue={undefined || ""}
            label="სქესი"
            id="gender"
          >
            <MenuItem value="women">ქალი</MenuItem>
            <MenuItem value="men">კაცი</MenuItem>
            <MenuItem value="unisex">Unisex</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
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
              sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
              type="text"
              {...register("sale")}
              label="ფასდაკლების პროცენტი"
            />
          ) : null}
        </div>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ width: { xs: 180, sm: 250, md: 350, lg: 450 } }}
        >
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
