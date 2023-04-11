import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import LogIn from "./LogIn";

const AdminPanel = () => {
  const [login, setLogin] = useState(false);
  const { menu } = useParams();

  const [data, setData] = useState<Array<DataTypes>>([]);
  const [checkout, setCheckout] = useState<Array<CheckoutsType>>();
  const navigate = useNavigate();
  useEffect(() => {
    getClothingModels({ setData });
  }, []);

  useEffect(() => {
    if (!login) {
      navigate("/admin-panel");
    } else if (login) {
      navigate("/admin-panel");
    }
  }, [login]);

  return (
    <Container>
      <>
        <AdminDashboard />
        {menu === "selling" ? <Lists /> : null}
        {menu === "add-new-model" ? <UploadModel /> : null}
        {menu === "checkout" ? (
          <Checkouts checkout={checkout} setCheckout={setCheckout} />
        ) : null}

        {menu === "sold" && checkout?.length! > 0 ? (
          <SoldItems checkout={checkout} />
        ) : null}
        {menu === "storage" ? <Storages data={data} /> : null}
      </>
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
