import React, { useEffect, useState } from "react";
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
import { DeliveryDining, AddShoppingCart } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ProductDesc from "../components/ProductDesc";
import { lightBlue } from "@mui/material/colors";

const ProductDetailPage = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const { register, handleSubmit } = useForm();
  const { object } = useParams();

  const EachModel = data.find((item) => item._id === object);
  let EachModelStorage = [];
  for (let i = 1; i < EachModel!?.storage; i++) {
    EachModelStorage.push(i);
  }

  useEffect(() => {
    getClothingModels({ setData });
  }, []);

  const [mainImg, setMainImg] = useState(EachModel?.path[0]);

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
    <>
      <Container>
        <div
          style={{
            display: "flex",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {EachModel?.path.map((img) => (
              <ImgBorder
                mainImg={mainImg}
                image={img}
                src={img}
                alt="model"
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
          <img
            src={mainImg ? mainImg : EachModel?.path[0]}
            alt="model"
            width={440}
            height={600}
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
              <InputLabel>რაოდენობა</InputLabel>
              <Select label="რაოდენობა" {...register("quantity")}>
                {EachModelStorage.map((count) => (
                  <MenuItem value={count}>{count}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained">
              <AddShoppingCart />
              კალათაში დამატება
            </Button>
          </form>

          <h3
            style={{
              display: "flex",
              gap: 8,
              borderBottom: "1px solid lightgray",
            }}
          >
            <DeliveryDining /> მიწოდება
          </h3>
          <h4>
            საკურიერო მომსახურებაზე მუშაობს{" "}
            <span style={{ color: "#039be5", fontSize: 20 }}>
              {" "}
              საქართველოს ფოსტა
            </span>
          </h4>
          <h4>მიწოდების საფასური თბილისი - 5ლ</h4>
          <h4>მიწოდების საფასური საქართველო - 8ლ</h4>
        </DetailsWrapper>
      </Container>
      <ProductDesc desc={EachModel?.desc} />
    </>
  );
};

export default ProductDetailPage;

const Container = styled.div(
  () => css`
    width: 100%;
    padding: 24px;
    border-bottom: 1px solid lightgray;
    display: flex;
    gap: 24px;
  `
);

const ImgBorder = styled.img(
  ({ image, mainImg }: { image: string; mainImg?: string }) => css`
    width: 104px;
    height: 140px;
    padding: 8px;
    outline: ${image === mainImg ? "1px solid gray" : ""};
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
