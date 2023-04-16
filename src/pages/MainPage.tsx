import React, { useEffect, useState } from "react";
import BestSeller from "../components/BestSeller";
import MainBanner from "../components/MainBanner";
import MenAndWomen from "../components/MenAndWomen";
import MenPhoto from "../assets/model3.png";
import WomenPhoto from "../assets/model4.png";
import {
  DataTypes,
  getClothingModels,
  getNewAddedClothes,
} from "../components/functions";
import NewAdded from "../components/NewAdded";
import FollowUs from "../components/FollowUs";
import styled, { css } from "styled-components";
import { useMediaQuery } from "@mui/material";

const menColor =
  "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(205,183,162,1) 100%);";
const womenColor =
  "radial-gradient(circle, rgba(225,214,225,1) 0%, rgba(216,176,223,1) 19%, rgba(196,94,219,1) 100%);";

const MainPage = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const [newAdded, setNewAdded] = useState<Array<DataTypes>>([]);
  const tabletOrMobile = useMediaQuery("(max-width:1550px)");
  // short array for get 5 items to main page
  if (tabletOrMobile) {
    newAdded.length = 4;
    data.length = 4;
  } else {
    data.length = 5;
    newAdded.length = 5;
  }

  useEffect(() => {
    getClothingModels({ setData });
  }, []);

  useEffect(() => {
    getNewAddedClothes({ setNewAdded });
  }, []);

  return (
    <>
      <MainBanner />
      <BestSeller data={data} />
      <BannerWrapper>
        <MenAndWomen color={menColor} img={MenPhoto} model="men" />
        <MenAndWomen color={womenColor} img={WomenPhoto} model="women" />
      </BannerWrapper>
      <NewAdded newAdded={newAdded} />
      <FollowUs />
    </>
  );
};

export default MainPage;
const BannerWrapper = styled.div(
  () => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    @media (max-width: 1325px) {
      flex-direction: column;
      gap: 0;
    }
  `
);
