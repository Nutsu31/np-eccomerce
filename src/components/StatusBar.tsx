import React from "react";
import { Details } from "./NewAdded";
import styled, { css } from "styled-components";

const StatusBar = ({ status }: { status: string }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div style={{ display: "flex", alignItems: "center", width: 720 }}>
        <Circle status={status} name="Order Placed" />
        <Line status={status} name="Order Placed" />
        <Circle status={status} name="inProgress" />
        <Line status={status} name="inProgress" />
        <Circle status={status} name="shipped" />
        <Line status={status} name="shipped" />
        <Circle status={status} name="delivered" />
      </div>
      <div
        style={{
          width: 800,
          display: "flex",
          justifyContent: "space-between",
          //   paddingRight: "24px",
        }}
      >
        <Details>მოლოდინშია</Details>
        <Details>პროცესშია</Details>
        <Details>გზაშია</Details>
        <Details>ჩაბარებულია</Details>
      </div>
    </div>
  );
};

export default StatusBar;

const Circle = styled.div(
  ({ status, name }: { status: string; name: string }) => css`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: ${status === name ? "3px solid lightgray" : "lightgray"};
    background: ${status === name ? "black" : "lightgray"};
  `
);

const Line = styled.div(
  ({ status, name }: { status: string; name: string }) => css`
    width: 250px;
    height: 6px;
    border: 2px solid lightgray;
    background: lightgray;
  `
);
