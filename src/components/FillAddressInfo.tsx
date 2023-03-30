import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { CartType } from "./functions";

const FillAddressInfo = ({
  totalPrice,
  cartItem,
}: {
  totalPrice: number;
  cartItem: Array<CartType>;
}) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    data.totalPrice = totalPrice;
    data.model = cartItem;
    data._id = Date.now().toString();
    data.status = "Order Placed";
    console.log(data);
    axios({
      method: "POST",
      url: "http://localhost:5001/checkout",
      headers: { "Content-Type": "application/json" },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        totalPrice: data.totalPrice,
        _id: data._id,
        model: data.model,
        city: data.city,
        phone: data.phone,
        alt_phone: data.alt_phone,
        postalCode: data.postalCode,
        status: data.status,
        street: data.street,
      },
    })
      .then((res) => console.log(res.data.finalModel))
      .catch((err) => console.log(err));
    reset({
      firstname: "",
      lastname: "",
      city: "",
      street: "",
      phone: "",
      alt_phone: "",
      postalCode: "",
    });
    localStorage.clear();
  });
  return (
    <div>
      <h1>ადრესატის ინფორმაცია:</h1>
      <form onSubmit={onSubmit}>
        <input type="text" {...register("firstname")} placeholder="სახელი" />
        <input type="text" {...register("lastname")} placeholder="გვარი" />
        <input type="text" {...register("city")} placeholder="ქალაქი" />
        <input type="text" {...register("street")} placeholder="ქუჩა" />
        <input
          type="number"
          {...register("phone")}
          placeholder="საკონტაქტო ნომერი"
        />
        <input
          type="number"
          {...register("alt_phone")}
          placeholder="სხვა საკონტაქტო პირის ნომერი"
        />
        <input
          type="text"
          {...register("postalCode")}
          placeholder="საფოსტო კოდი მაგ:(თბილისი: 0162)"
        />
        <button>გაგრძელება</button>
      </form>
    </div>
  );
};

export default FillAddressInfo;
