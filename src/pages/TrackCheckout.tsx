import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { CheckoutsType, orderTracker } from "../components/functions";
import { FaSearch } from "react-icons/fa";

const TrackCheckout = () => {
  const [order, setOrder] = useState<CheckoutsType[] | undefined>(undefined);
  const [findWithNumber, setFindWithNumber] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const { pathname } = useLocation();
  // console.log(order);
  // console.log(pathname);
  useEffect(() => {
    orderTracker({ setOrder, pathname });
  }, []);

  const onSubmit = handleSubmit((data) => {
    setFindWithNumber(data.phone);
  });
  const findOrder = order?.find(
    (item) => item.phone.toString() === findWithNumber
  );
  return (
    <Container>
      <div>
        {findOrder ? (
          <>
            <div>
              <h1>შეკვეთის დეტალები</h1>
              <p>
                {findOrder.firstname} {findOrder.lastname}
              </p>
              <p>{findOrder.city}</p>
              <p>{findOrder.street}</p>
              <p>{findOrder.phone}</p>
              <p>{findOrder.status}</p>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              {findOrder?.model.map((item) => (
                <div key={item.id}>
                  <img
                    src={`http://localhost:5001/uploads/${item.img}`}
                    width={100}
                    alt=""
                  />
                  <p>{item.name}</p>
                  <p>{item.size}</p>
                  <p>{item.quantity}</p>
                </div>
              ))}
            </div>
          </>
        ) : null}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("phone")}
            style={{ width: 380, height: 40 }}
            placeholder="შეკვეთის ძებნა (ტელ)"
          />
          <button
            style={{
              width: 40,
              height: 40,
              fontSize: 18,
              border: "none",
              background: "none",
            }}
          >
            <FaSearch />
          </button>
        </form>
      </div>
    </Container>
  );
};

export default TrackCheckout;

const Container = styled.div(
  () => css`
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  `
);
