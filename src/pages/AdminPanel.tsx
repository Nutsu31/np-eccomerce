import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import AdminDashboard from "../components/AdminDashboard";
import { DataTypes, getClothingModels } from "../components/functions";
import Lists from "../components/Lists";
import Storages from "../components/Storages";
import UploadModel from "../components/UploadModel";

const AdminPanel = () => {
  const [login, setLogin] = useState(true);
  const { menu } = useParams();

  const [data, setData] = useState<Array<DataTypes>>([]);

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
