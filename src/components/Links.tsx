import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataTypes, handleDiscount } from "./functions";
import { Details, EachModel, New, Sale, SaledPrice } from "./NewAdded";
import { DarkModeContext } from "../pages/Root";
const Links = ({ item }: { item: DataTypes }) => {
  const Dark = useContext(DarkModeContext);
  return (
    <div style={{ maxWidth: 250, height: 500 }}>
      <Link
        to={`/shop/${item._id}`}
        key={item._id}
        style={{
          textDecoration: "none",
          color: Dark ? "rgba(255, 255, 255, 0.7)" : " black",
        }}
      >
        <EachModel>
          {item.collections === "new" ? <New>New</New> : null}
          {item.sale ? (
            <Sale collections={item.collections}>-{item.sale}%</Sale>
          ) : null}
          <img src={`${item.path[1]}`} alt="model" />

          <Details>{item.name}</Details>
          {item.sale ? (
            <Details>
              {"₾" + handleDiscount(item)}{" "}
              <SaledPrice>{"₾" + item.price + ".00"}</SaledPrice>
            </Details>
          ) : (
            <Details>{"₾" + item.price + ".00"}</Details>
          )}
        </EachModel>
      </Link>
    </div>
  );
};

export default Links;
