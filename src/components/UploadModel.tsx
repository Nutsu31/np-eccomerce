import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
const UploadModel = () => {
  const { register, handleSubmit } = useForm();
  const [sale, setSale] = useState(false);

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
        storage: data.storage,
        gender: data.gender,
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
        <Input type="number" {...register("storage")} placeholder="მარაგი" />
        <Input
          type="text"
          {...register("gender")}
          placeholder="ქალის / კაცის / Unisex"
        />
        <div>
          <input type="checkbox" id="sale" />
          <label htmlFor="sale" onClick={() => setSale(!sale)}>
            ფასდაკლება
          </label>
        </div>
        {sale ? (
          <Input
            type="text"
            {...register("sale")}
            placeholder="ფასდაკლების პროცენტი"
          />
        ) : null}
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default UploadModel;

const Form = styled.form(
  () => css`
    width: 500px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 12px;
  `
);

const Input = styled.input(
  () => css`
    width: 100%;
    height: 40px;
    padding: 0 16px;
  `
);

const Button = styled.button(
  () => css`
    width: 100%;
    height: 60px;
    border: none;
    background-color: gray;
  `
);
