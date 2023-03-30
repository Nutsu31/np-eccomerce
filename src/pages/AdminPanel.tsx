import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import AdminDashboard from "../components/AdminDashboard";
import Checkouts from "../components/Checkouts";
import {
  CheckoutsType,
  DataTypes,
  getClothingModels,
} from "../components/functions";
import Lists from "../components/Lists";
import SoldItems from "../components/SoldItems";
import Storages from "../components/Storages";
import UploadModel from "../components/UploadModel";

const AdminPanel = () => {
  const [login, setLogin] = useState(true);
  const { menu } = useParams();

  const [data, setData] = useState<Array<DataTypes>>([]);
  const [checkout, setCheckout] = useState<Array<CheckoutsType>>();

  useEffect(() => {
    getClothingModels({ setData });
  }, []);
  return (
    <Container>
      {login ? (
        <>
          <AdminDashboard />
          {menu === "selling" ? <Lists /> : null}
          {menu === "add-new-model" ? <UploadModel /> : null}
          {menu === "checkout" ? (
            <Checkouts checkout={checkout} setCheckout={setCheckout} />
          ) : null}
          {menu === "sold" ? <SoldItems checkout={checkout} /> : null}
          {menu === "storage" ? <Storages data={data} /> : null}
        </>
      ) : (
        <h1>გაიარეთ ავტორიზაცია</h1>
      )}
    </Container>
  );
};

export default AdminPanel;

const Container = styled.div(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
);
