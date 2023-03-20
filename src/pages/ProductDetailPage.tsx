import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataTypes, getClothingModels } from "../components/functions";

const ProductDetailPage = () => {
  const [data, setData] = useState<Array<DataTypes>>([]);
  const { object } = useParams();
  const EachModel = data.find((item) => item._id === object);
  useEffect(() => {
    getClothingModels({ setData });
  }, []);

  return (
    <div>
      <img
        src={`http://localhost:5001/uploads/${EachModel?.path}`}
        alt="model"
        width={552}
        height={580}
      />
    </div>
  );
};

export default ProductDetailPage;
