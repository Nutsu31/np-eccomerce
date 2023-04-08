import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { DataTypes } from "./functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const Storages = ({ data }: { data: Array<DataTypes> }) => {
  const nofitySucces = () => toast.success("წარმატებით განახლდა დაარეფრეშე!");
  const nofityErr = () => toast.error("განახლება უარყოფილია!");
  const nofitySuccesDeleted = () =>
    toast.success("წარმატებით წაიშალა დაარეფრეშე!");
  const nofityRemoveErr = () => toast.error("წაშლა უარყოფილია!");
  const [updateStorage, setUpdateStorage] = useState<
    UpdateStorageType | undefined
  >(undefined);

  interface UpdateStorageType {
    id?: string;
    storage?: number;
  }

  async function storageUpdate({
    updateStorage,
  }: {
    updateStorage: UpdateStorageType | undefined;
  }) {
    if (updateStorage === undefined) {
      return;
    } else {
      axios({
        method: "PUT",
        url: "http://localhost:5001/storages",
        headers: { "Content-Type": "application/json" },
        data: {
          id: updateStorage?.id,
          storage: updateStorage?.storage,
        },
      })
        .then((res) => nofitySucces())
        .catch((err) => nofityErr());
    }
  }
  const href = window.location.href;
  async function deleteItem(id: string) {
    console.log(id);
    console.log("გამოიძახა");
    axios({
      method: "DELETE",
      url: "http://localhost:5001/remove-item",
      headers: { "Content-Type": "application/json" },
      data: {
        id: id,
      },
    })
      .then(() => nofitySuccesDeleted())
      .catch(() => nofityRemoveErr());
  }

  useEffect(() => {
    storageUpdate({ updateStorage });
  }, [updateStorage, storageUpdate]);
  return (
    <TableGenerator>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Thead>
        <tr>
          <th>სურათი</th>
          <th>სახელი</th>
          <th>ფერი</th>
          <th>ზომა</th>
          <th>დარჩენილი რაოდენობა</th>
          <th>წაშლა</th>
        </tr>
      </Thead>
      <tbody>
        {data.map((item) => (
          <tr key={Math.random() * Math.random() * Math.random()}>
            <Td item={item.storage}>
              <img
                src={item.path[0]}
                alt="item"
                style={
                  item.storage === 0 ? { border: "10px solid red" } : undefined
                }
                width={86}
              />
            </Td>
            <Td item={item.storage}>{item.name}</Td>
            <Td item={item.storage}>{item.color}</Td>
            <Td item={item.storage}>{item.size}</Td>
            <Td item={item.storage}>
              <Button
                variant="contained"
                onClick={() => setUpdateStorage({ id: item._id, storage: -1 })}
              >
                -1
              </Button>
              <Button
                variant="contained"
                onClick={() => setUpdateStorage({ id: item._id, storage: -3 })}
              >
                -3
              </Button>
              <Button
                variant="contained"
                onClick={() => setUpdateStorage({ id: item._id, storage: -5 })}
              >
                -5
              </Button>
              დარჩენილია: {item.storage}{" "}
              <Button
                variant="contained"
                onClick={() => setUpdateStorage({ id: item._id, storage: 1 })}
              >
                +1
              </Button>
              <Button
                variant="contained"
                onClick={() => setUpdateStorage({ id: item._id, storage: 3 })}
              >
                +3
              </Button>
              <Button
                variant="contained"
                onClick={() => setUpdateStorage({ id: item._id, storage: 5 })}
              >
                +5
              </Button>
            </Td>
            <Td item={item.storage}>
              <Button color="error" onClick={() => deleteItem(item._id)}>
                <Delete />
              </Button>
            </Td>
          </tr>
        ))}
      </tbody>
    </TableGenerator>
  );
};

export default Storages;

const TableGenerator = styled.table(
  () => css`
    width: 100%;
    background-color: #ffffff;
    border-collapse: collapse;
    border-width: 2px;
    border-color: #e8e4d4;
    border-style: solid;
    color: #000000;
  `
);

const Thead = styled.thead(
  () => css`
    background: #e8e4d4;
  `
);
const Td = styled.td(
  ({ item }: { item: number }) => css`
    font-weight: 600;
    text-align: center;
    color: ${item === 0 ? "red" : "black"};
    border: 1px solid black;
  `
);

{
  /* <style>
table.GeneratedTable {
width: 100%;
background-color: #ffffff;
border-collapse: collapse;
border-width: 2px;
border-color: #e8e4d4;
border-style: solid;
color: #000000;
}

table.GeneratedTable td, table.GeneratedTable th {
border-width: 2px;
border-color: #e8e4d4;
border-style: solid;
padding: 3px;
}

table.GeneratedTable thead {
background-color: #e5e3dc;
}
</style> */
}
