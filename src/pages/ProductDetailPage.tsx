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

const ProductDetailPage = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const { register, handleSubmit } = useForm();
  const { object } = useParams();

  const EachModel = data.find((item) => item._id === object);
  let EachModelStorage = [];
  for (let i = 0; i < EachModel!?.storage; i++) {
    EachModelStorage.push(i + 1);
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
        <AllImgWrapper>
          <SmallImgWrapper>
            {EachModel?.path.map((img) => (
              <div key={Math.random() * Math.random()}>
                <SmallImg
                  mainImg={mainImg}
                  image={img}
                  src={img}
                  alt="model"
                  onClick={() => setMainImg(img)}
                />
              </div>
            ))}
          </SmallImgWrapper>
          <MainImg
            src={mainImg ? mainImg : EachModel?.path[0]}
            alt="model"
            width={440}
            height={600}
          />
        </AllImgWrapper>
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
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 200 } },
                }}
                defaultValue={undefined || ""}
                {...register("size")}
              >
                <MenuItem value={EachModel?.size}>{EachModel?.size}</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>ფერი</InputLabel>
              <Select
                label="ფერი"
                defaultValue={undefined || ""}
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 200 } },
                }}
                {...register("color")}
              >
                <MenuItem value={EachModel?.color || ""}>
                  {getName(EachModel?.color)}
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>რაოდენობა</InputLabel>
              <Select
                label="რაოდენობა"
                {...register("quantity")}
                defaultValue={undefined || ""}
              >
                {EachModelStorage.map((count) => (
                  <MenuItem key={Math.random() * Math.random()} value={count}>
                    {count}
                  </MenuItem>
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
            <DeliveryDining /> მიწოდება !
          </h3>
          <H4>
            საკურიერო მომსახურებაზე მუშაობს{" "}
            <Highlighted>საქართველოს ფოსტა</Highlighted>
          </H4>
          <H4>
            მიწოდების საფასური თბილისი -<Highlighted>5ლ</Highlighted>
          </H4>
          <H4>
            მიწოდების საფასური საქ. - <Highlighted>8ლ</Highlighted>
          </H4>
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
    @media (max-width: 1050px) {
      flex-direction: column;
      align-items: center;
    }
  `
);

const DetailsWrapper = styled.div(
  () => css`
    width: 500px;
    height: 624px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    @media (max-width: 550px) {
      padding: 24px 48px;
    }
    @media (max-width: 430px) {
      padding: 24px 84px;
    }
    @media (max-width: 350px) {
      padding: 24px 124px;
    } ;
  `
);
const Highlighted = styled.span(
  () => css`
    font-size: 20;
    color: #039be5;
    @media (max-width: 1210px) {
      font-size: 18;
    }
  `
);

const H4 = styled.h4(
  () => css`
    @media (max-width: 1210px) {
      font-size: 15px;
    }
  `
);

const AllImgWrapper = styled.div(
  () => css`
    width: 568px;
    display: flex;
    align-items: center;
    gap: 24px;
    @media (max-width: 1180px) {
      flex-direction: column-reverse;
      justify-content: center;
    }
  `
);
const SmallImgWrapper = styled.div(
  () => css`
    width: 104px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    @media (max-width: 1180px) {
      width: 440px;
      flex-direction: row;
    }
    @media (max-width: 550px) {
      gap: 8px;
      width: 360px;
    }
    @media (max-width: 350px) {
      width: 350px;
      padding: 0 32px;
      justify-content: center;
    }
  `
);

const SmallImg = styled.img(
  ({ image, mainImg }: { image: string; mainImg?: string }) => css`
    width: 104px;
    height: 140px;
    padding: ${image === mainImg ? "8px" : ""};
    outline: ${image === mainImg ? "1px solid gray" : ""};
    @media (max-width: 550px) {
      width: 84px;
      height: 100px;
    }
  `
);

const MainImg = styled.img(
  () => css`
    width: 400px;
    height: 600px;
    @media (max-width: 550px) {
      width: 300px;
      height: 500px;
    }
    @media (max-width: 350px) {
      width: 350px;
    }
  `
);
