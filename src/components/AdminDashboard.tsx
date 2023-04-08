import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  AddAPhoto,
  Sell,
  ShoppingCartCheckout,
  ShopOutlined,
  Storage,
} from "@mui/icons-material";
const AdminDashboard = () => {
  return (
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
  );
};

export default AdminDashboard;

const Styles = {
  text: {
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
  `
);
