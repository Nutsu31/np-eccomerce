import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  DataTypes,
  getClothingModels,
  getName,
  handleDiscount,
} from "../components/functions";
import { Details, SaledPrice } from "../components/NewAdded";

const ProductDetailPage = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const { object } = useParams();

  const EachModel = data.find((item) => item._id === object);

  useEffect(() => {
    getClothingModels({ setData });
  }, []);

  const onSubimit = handleSubmit((data) => {
    const itemsArr = [];
    const itemOption = {
      img: EachModel?.path,
      name: EachModel?.name,
      quantity: data.quantity,
      price: EachModel?.price,
    };
    const item = JSON.parse(localStorage.getItem("key")!);

    if (item == null) {
      itemsArr.push(itemOption);
      localStorage.setItem("key", JSON.stringify(itemsArr));
    } else {
      itemsArr.push(...item, itemOption);
      localStorage.setItem("key", JSON.stringify(itemsArr));
    }
  });

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <ImgBorder
          src={`http://localhost:5001/uploads/${EachModel?.path}`}
          alt="model"
        />
        <ImgBorder
          src={`http://localhost:5001/uploads/${EachModel?.path}`}
          alt="model"
        />
        <ImgBorder
          src={`http://localhost:5001/uploads/${EachModel?.path}`}
          alt="model"
        />
      </div>
      <div>
        <img
          src={`http://localhost:5001/uploads/${EachModel?.path}`}
          alt="model"
          width={500}
          height={624}
        />
      </div>
      <DetailsWrapper>
        <h2 style={{ display: "contents" }}>{EachModel?.name}</h2>
        <span
          style={{
            color: EachModel?.storage === 0 ? "red" : "green",
            fontWeight: 600,
          }}
        >
          {EachModel?.storage === 0 ? "არ არის მარაგში" : "მარაგშია"}
        </span>
        {EachModel?.sale ? (
          <Details>
            {"₾" + handleDiscount(EachModel)}{" "}
            <SaledPrice>{"₾" + EachModel?.price + ".00"}</SaledPrice>
          </Details>
        ) : (
          <Details>{"₾" + EachModel?.price + ".00"}</Details>
        )}
        <form onSubmit={onSubimit}>
          <p>ფერი:</p>
          <select {...register("color")}>
            <option>აირჩიე ფერი</option>
            <option
              defaultValue={EachModel?.size}
              value={EachModel?.color}
              style={{
                background: EachModel?.color,
                color: EachModel?.color === "White" ? "black" : "white",
              }}
            >
              {getName(EachModel?.color)}
            </option>
          </select>
          <p>ზომა:</p>
          <select {...register("size", { required: true })}>
            <option>აირჩიე ზომა</option>
            <option value={EachModel?.size}>
              {EachModel?.size.toLocaleUpperCase()}
            </option>
          </select>
          <p>რაოდენობა:</p>

          <input
            type="number"
            {...register("quantity")}
            min={1}
            defaultValue={1}
            max={EachModel?.storage}
            onChange={(e) => setValue("quantity", e.target.value)}
          />
          <button>კალათაში დამატება</button>
          <button type="submit">ყიდვა</button>
        </form>
      </DetailsWrapper>
    </Container>
  );
};

export default ProductDetailPage;

const Container = styled.div(
  () => css`
    width: 100%;
    min-height: 100vh;
    display: flex;
    gap: 24px;
  `
);

const ImgBorder = styled.img(
  () => css`
    width: 184px;
    height: 184px;
    padding: 8px;
    outline: 1px solid gray;
  `
);

const DetailsWrapper = styled.div(
  () => css`
    width: 500px;
    height: 624px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `
);
const CustomLabel = styled.label(
  ({ color }: { color: string | undefined }) => css`
    width: 16px;
    height: 16px;
    color: white;
    background: ${color};
    outline: ${color ? "1px solid white" : null};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `
);
