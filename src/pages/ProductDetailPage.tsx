import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  DataTypes,
  getClothingModels,
  handleDiscount,
} from "../components/functions";
import { Details, SaledPrice } from "../components/NewAdded";

const ProductDetailPage = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [quantity, setQuantity] = useState(1);
  const { object } = useParams();
  const EachModel = data.find((item) => item._id === object);
  useEffect(() => {
    getClothingModels({ setData });
  }, []);

  const onSubimit = handleSubmit((data) => {
    console.log(data);
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
          <CustomLabel id="black" color={EachModel?.color}>
            <input
              type="radio"
              {...register("color")}
              value="black"
              style={{ accentColor: "black", visibility: "hidden" }}
              checked
            />
          </CustomLabel>
          <div></div>
          <p>ზომა:</p>
          <label
            style={{
              width: "40px",
              height: 20,
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            <input
              type="radio"
              {...register("size")}
              value={EachModel?.size}
              checked
              style={{
                accentColor: "black",
                visibility: "hidden",
                position: "absolute",
              }}
            />
            {EachModel?.size.toUpperCase()}
          </label>
          <p>რაოდენობა:</p>
          <button
            onClick={() => {
              setQuantity(quantity - 1);
            }}
          >
            -
          </button>
          <input
            type="number"
            {...register("quantity")}
            min={1}
            onChange={(e) => setValue("quantity", e.target.value)}
          />
          <button onClick={() => {}}>+</button>
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
