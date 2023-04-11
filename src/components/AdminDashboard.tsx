import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  AddAPhoto,
  Sell,
  ShoppingCartCheckout,
  ShopOutlined,
  Storage,
  Menu,
} from "@mui/icons-material";
import AdminDashboardMobile from "./AdminDashboardMobile";
import { Button, useMediaQuery } from "@mui/material";
const AdminDashboard = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const location = useLocation();
  const media = useMediaQuery("(max-width:700px)");
  useEffect(() => {
    setShowDashboard(false);
  }, [location]);

  console.log(media);
  return (
    <>
      <AdminBar>
        <AddNew>
          <AddAPhoto style={{ fontSize: 40, color: "lightgray" }} />
          <Link style={Styles.text} to="add-new-model">
            მოდელის დამატება
          </Link>
        </AddNew>
        <AddNew>
          <ShopOutlined style={{ fontSize: 40, color: "lightgray" }} />
          <Link style={Styles.text} to="selling">
            გაყიდვაშია
          </Link>
        </AddNew>
        <AddNew>
          <ShoppingCartCheckout style={{ fontSize: 40, color: "lightgray" }} />
          <Link style={Styles.text} to="checkout">
            შეკვეთა
          </Link>
        </AddNew>
        <AddNew>
          <Sell style={{ fontSize: 40, color: "lightgray" }} />
          <Link style={Styles.text} to="sold">
            გაიყიდა
          </Link>
        </AddNew>
        <AddNew>
          <Storage style={{ fontSize: 40, color: "lightgray" }} />
          <Link style={Styles.text} to="storage">
            მარაგი
          </Link>
        </AddNew>
      </AdminBar>
      <AdminDashboardMobile
        showDashboard={showDashboard}
        setShowDashboard={setShowDashboard}
      />
      {media ? (
        <Button onClick={() => setShowDashboard(!showDashboard)}>
          <Menu />
        </Button>
      ) : null}
    </>
  );
};

export default AdminDashboard;

const Styles = {
  text: {
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    color: "black",
  },
};

const AdminBar = styled.div(
  () => css`
    width: 100%;
    height: 150px;
    margin: 16px 0;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 64px;
    text-align: center;
    @media (max-width: 700px) {
      display: none;
    }
  `
);

const AddNew = styled.div(
  () => css`
    width: 120px;
    height: 120px;
    border-radius: 16px;
    border: 4px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 2px 2px 5px 1px black;
    @media (max-width: 780px) {
      width: 80px;
      height: 80px;
    }
  `
);
