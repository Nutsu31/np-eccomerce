import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import AdminDashboard from "../components/AdminDashboard";
import Lists from "../components/Lists";
import UploadModel from "../components/UploadModel";

const AdminPanel = () => {
  const [login, setLogin] = useState(true);
  const { menu } = useParams();
  console.log(menu);
  return (
    <Container>
      {login ? (
        <>
          <AdminDashboard />
          {menu === "selling" ? <Lists /> : null}
          {menu === "add-new-model" ? <UploadModel /> : null}
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
