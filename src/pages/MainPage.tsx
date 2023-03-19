import React, { useEffect, useState } from "react";
import BestSeller from "../components/BestSeller";
import MainBanner from "../components/MainBanner";
import MenAndWomen from "../components/MenAndWomen";
import MenPhoto from "../assets/model3.png";
import WomenPhoto from "../assets/model4.png";
import { DataTypes, getClothingModels } from "../components/functions";
import NewAdded from "../components/NewAdded";

const menColor =
  "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(205,183,162,1) 100%);";
const womenColor =
  "radial-gradient(circle, rgba(225,214,225,1) 0%, rgba(216,176,223,1) 19%, rgba(196,94,219,1) 100%);";

const MainPage = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  data.length = 5;
  // console.log(data);
  useEffect(() => {
    getClothingModels({ setData });
  }, [getClothingModels]);
  return (
    <>
      <MainBanner />
      <BestSeller data={data} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <MenAndWomen color={menColor} img={MenPhoto} />
        <MenAndWomen color={womenColor} img={WomenPhoto} />
      </div>
      <NewAdded data={data} />
    </>
  );
};

export default MainPage;
