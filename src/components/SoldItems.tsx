import React from "react";
import { CheckoutsType, getStatusColor } from "./functions";

const SoldItems = ({ checkout }: { checkout: CheckoutsType[] | undefined }) => {
  const totalSoldPrice = checkout?.map((item) => item.totalPrice);
  const countSoldPrice = totalSoldPrice?.reduce((x, y) => x + y);
  const totalCheckouts = checkout?.length;

  const getAllArraysTogether = checkout?.map((item) =>
    item.model.map((i) => i.quantity)
  );
  const totalSold = getAllArraysTogether?.flat().reduce((x, y) => x + y);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 24,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 300,
            height: 200,
            backgroundColor: "lightgray",
            borderRadius: 20,
          }}
        >
          <p
            style={{
              fontSize: 34,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            სულ შეკვეთა:
            <span style={{ color: "#00BDB0", fontSize: 44, fontWeight: 700 }}>
              {totalCheckouts}
            </span>
          </p>
        </div>
        <div
          style={{
            width: 300,
            height: 200,
            backgroundColor: "lightgray",
            borderRadius: 20,
          }}
        >
          <p
            style={{
              fontSize: 34,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ჯამი:
            <span style={{ color: "#00BDB0", fontSize: 44, fontWeight: 700 }}>
              {countSoldPrice}₾
            </span>
          </p>
        </div>
        <div
          style={{
            width: 300,
            height: 200,
            backgroundColor: "lightgray",
            borderRadius: 20,
          }}
        >
          <p
            style={{
              fontSize: 34,
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            გაყიდული:
            <span style={{ color: "#00BDB0", fontSize: 44, fontWeight: 700 }}>
              {totalSold}ც
            </span>
          </p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          // flexWrap: "wrap",
          gap: 24,
        }}
      >
        {checkout?.map((item) => (
          <div
            key={Math.random() * Math.random() * Math.random()}
            style={{
              border: "1px solid lightgray",
              width: 250,
              textAlign: "center",
              display: "flex",
            }}
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
    </>
  );
};

export default SoldItems;
