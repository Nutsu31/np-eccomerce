import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
const AdminDashboard = () => {
  return (
    <AdminBar>
      <Link to="add-new-model">მოდელის დამატება</Link>
      <Link to="selling">გაყიდვაშია</Link>
      <Link to="checkout">შეკვეთა</Link>
      <Link to="sold">გაიყიდა</Link>
      <Link to="storage">მარაგი</Link>
    </AdminBar>
  );
};

export default AdminDashboard;

const AdminBar = styled.div(
  () => css`
    width: 100%;
    height: 56px;
    margin: 16px 0;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 64px;
  `
);
