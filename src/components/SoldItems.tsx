import React from "react";
import { CheckoutsType, getStatusColor } from "./functions";

const SoldItems = ({ checkout }: { checkout: CheckoutsType[] | undefined }) => {
  const totalSoldPrice = checkout?.map((item) => item.totalPrice);
  const countSoldPrice = totalSoldPrice?.reduce((x, y) => x + y);
  const soldItems = checkout?.map((item) => item.model.length.valueOf());
  const totalSoldItems = soldItems?.reduce((pre, curr) => pre + curr);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        // flexWrap: "wrap",
        gap: 64,
      }}
    >
      <p
        style={{
          width: "100%",
          height: 30,
          textAlign: "center",
          // background: "lightgray",
        }}
      >
        სულ გაიყიდა: {totalSoldItems}ც ჯამი: {countSoldPrice}₾
      </p>
      {checkout?.map((item) => (
        <div
          key={Math.random() * Math.random() * Math.random()}
          style={{ border: "1px solid lightgray" }}
        >
          {item.status === "delivered" ? (
            <div
              style={{
                background:
                  item.status === "delivered"
                    ? getStatusColor(item.status)
                    : undefined,
              }}
            >
              <p>
                {item.firstname} {item.lastname}
              </p>
              <p>
                {item.city} {item.postalCode}
              </p>
              <p>
                {item.phone} {item.alt_phone}
              </p>
              <p>{item.street}</p>
              <p>{item.totalPrice}₾</p>
              <p>{item.status}</p>
              <div>
                {item.model.map((model) => (
                  <div key={Math.random() * Math.random() * Math.random()}>
                    <img src={model.img[0]} alt="model" width={100} />
                    <p>
                      {model.name} {model.price}
                    </p>
                    <p>
                      რაოდენობა: x{model.quantity} ზომა: {model.size}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SoldItems;
