import React from "react";
import { CheckoutsType } from "./functions";

const SoldItems = ({ checkout }: { checkout: CheckoutsType[] | undefined }) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        gap: 64,
      }}
    >
      {checkout?.map((item) => (
        <div key={Math.random() * Math.random() * Math.random()}>
          {item.status === "delivered" ? (
            <div>
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
              <p
                style={{
                  background: item.status === "delivered" ? "green" : undefined,
                }}
              >
                {item.status}
              </p>
              <div>
                {item.model.map((model) => (
                  <div key={Math.random() * Math.random() * Math.random()}>
                    <img
                      src={`http://localhost:5001/uploads/${model.img}`}
                      alt="model"
                      width={100}
                    />
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