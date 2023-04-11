import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  AddAPhoto,
  Sell,
  ShoppingCartCheckout,
  ShopOutlined,
  Storage,
  Close,
} from "@mui/icons-material";
import { Button } from "@mui/material";

interface adminDash {
  showDashboard: boolean;
  setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminDashboardMobile = ({
  showDashboard,
  setShowDashboard,
}: adminDash) => {
  return (
    <AdminBarMobile showDashboard={showDashboard}>
      <Button onClick={() => setShowDashboard(false)}>
        <Close />
      </Button>
      <span>Admin Panel</span>
      <AddNew>
        <AddAPhoto style={{ fontSize: 30, color: "lightgray" }} />
        <Link style={Styles.text} to="add-new-model">
          მოდელის დამატება
        </Link>
      </AddNew>
      <AddNew>
        <ShopOutlined style={{ fontSize: 30, color: "lightgray" }} />
        <Link style={Styles.text} to="selling">
          გაყიდვაშია
        </Link>
      </AddNew>
      <AddNew>
        <ShoppingCartCheckout style={{ fontSize: 30, color: "lightgray" }} />
        <Link style={Styles.text} to="checkout">
          შეკვეთა
        </Link>
      </AddNew>
      <AddNew>
        <Sell style={{ fontSize: 30, color: "lightgray" }} />
        <Link style={Styles.text} to="sold">
          გაიყიდა
        </Link>
      </AddNew>
      <AddNew>
        <Storage style={{ fontSize: 30, color: "lightgray" }} />
        <Link style={Styles.text} to="storage">
          მარაგი
        </Link>
      </AddNew>
    </AdminBarMobile>
  );
};

export default AdminDashboardMobile;

const Styles = {
  text: {
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    color: "black",
  },
};

const AdminBarMobile = styled.div(
  ({ showDashboard }: { showDashboard: boolean }) => css`
    display: none;
    @media (max-width: 700px) {
      width: 200px;
      min-height: 100vh;
      padding: 20px 40px 0 0;
      background: rgb(111, 111, 111);
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      gap: 24px;
      text-align: right;
      position: absolute;
      right: ${showDashboard ? 0 : "-200px"};
      top: 0;
      z-index: 10;
      transition: 0.3s ease;
    }
  `
);

const AddNew = styled.div(
  () => css`
    width: 120px;
    height: 120px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 780px) {
      width: 80px;
      height: 80px;
    }
  `
);
