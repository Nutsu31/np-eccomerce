import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  DataTypes,
  getClothingModels,
  getName,
  handleDiscount,
} from "../components/functions";
import { Details, SaledPrice } from "../components/NewAdded";
import { DarkModeContext } from "./Root";
import { dark } from "@mui/material/styles/createPalette";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const ProductDetailPage = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const { register, handleSubmit, reset, setValue } = useForm();
  const { object } = useParams();

  const EachModel = data.find((item) => item._id === object);
  let EachModelStorage = [];
  for (let i = 1; i < EachModel!?.storage; i++) {
    EachModelStorage.push(i);
  }

  useEffect(() => {
    getClothingModels({ setData });
  }, []);

  const Dark = useContext(DarkModeContext);

  const onSubimit = handleSubmit((data) => {
    const itemsArr = [];
    const itemOption = {
      img: EachModel?.path,
      name: EachModel?.name,
      quantity: data.quantity,
      price: EachModel?.price,
      sale: EachModel?.sale,
      size: data.size,
      id: EachModel?._id,
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
          // height={624}
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
        <form
          onSubmit={onSubimit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <FormControl>
            <InputLabel>ზომა</InputLabel>
            <Select
              label="ზომა"
              value={EachModel?.size}
              MenuProps={{
                PaperProps: { sx: { maxHeight: 200 } },
              }}
              {...register("size")}
            >
              <MenuItem value={EachModel?.size}>{EachModel?.size}</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>ფერი</InputLabel>
            <Select
              label="ფერი"
              value={EachModel?.color}
              MenuProps={{
                PaperProps: { sx: { maxHeight: 200 } },
              }}
              {...register("color")}
            >
              <MenuItem value={EachModel?.color}>
                {getName(EachModel?.color)}
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            {/* <InputLabel>რაოდენობა</InputLabel>
            <OutlinedInput
              type="number"
              label="რაოდენობა"
              {...register("quantity")}
            /> */}
            <InputLabel>რაოდენობა</InputLabel>
            <Select label="რაოდენობა" {...register("quantity")}>
              {EachModelStorage.map((count) => (
                <MenuItem value={count}>{count}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Add To Cart
          </Button>
        </form>
        <span>უფასო მიწოდება პარასკვეი, 11 აპრილის ჩათვლით</span>
        <span>მიწოდების საფასური თბილისი - 5ლ</span>
        <span>მიწოდების საფასური საქართველო - 8ლ</span>
      </DetailsWrapper>
    </Container>
  );
};

export default ProductDetailPage;

const Container = styled.div(
  () => css`
    width: 100%;
    min-height: 100vh;
    padding: 24px;
    display: flex;
    justify-content: center;
    gap: 24px;
  `
);

const ImgBorder = styled.img(
  () => css`
    width: 184px;
    height: 200px;
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
