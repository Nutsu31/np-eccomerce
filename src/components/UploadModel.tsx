import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
const UploadModel = () => {
  const { register, handleSubmit, reset } = useForm();
  const [sale, setSale] = useState(false);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
        category: data.category,
        style: data.style,
        storage: data.storage,
        gender: data.gender,
        sale: data.sale,
      },
    })
      .then((res) => console.log(res.data.finalModel))
      .catch((err) => console.log(err));
    reset({
      name: "",
      price: "",
      size: "",
      color: "",
      image: "",
      category: "",
      style: "",
      storage: "",
      gender: "",
      sale: "",
    });
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
        <Input type="text" {...register("color")} placeholder="ფერი" />
        <Input type="number" {...register("storage")} placeholder="მარაგი" />
        <Select {...register("size")}>
          <option>აირჩიე ზომა</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </Select>
        <Select {...register("category")}>
          <option>კატეგორია</option>
          <option value="Suits">პიჯაკი</option>
          <option value="T-Shirts">მაისური</option>
        </Select>
        <Select {...register("style")}>
          <option>სტილი</option>
          <option value="Classic">კლასიკური</option>
          <option value="Urban">ყოველდღიური</option>
        </Select>
        <Select {...register("gender")}>
          <option>აირჩიე სქესი</option>
          <option value="women">ქალი</option>
          <option value="men">კაცი</option>
          <option value="unisex">Unisex</option>
        </Select>

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
    width: 300px;
    height: 40px;
    padding: 0 16px;
  `
);

const Button = styled.button(
  () => css`
    width: 300px;
    height: 60px;
    border: none;
    background-color: gray;
  `
);

const Select = styled.select(
  () => css`
    width: 336px;
    height: 50px;
    padding: 0 16px;
  `
);
