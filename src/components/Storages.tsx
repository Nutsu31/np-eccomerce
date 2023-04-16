import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { DataTypes } from "./functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DarkModeContext } from "../pages/Root";

const Storages = ({ data }: { data: Array<DataTypes> }) => {
  const dark = useContext(DarkModeContext);
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
        url: "http://192.168.0.104:5001/storages",
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
    axios({
      method: "DELETE",
      url: "http://192.168.0.104:5001/remove-item",
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
    <>
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
      <TableGenerator>
        <Thead dark={dark}>
          <tr>
            <th>სურათი</th>
            <th>სახელი</th>
            <th>ფერი</th>
            <th>სტატუსი</th>
            <th>ზომა</th>
            <th>დარჩენილი რაოდენობა</th>
            <th>წაშლა</th>
          </tr>
        </Thead>
        <tbody>
          {data.map((item) => (
            <tr key={Math.random() * Math.random() * Math.random()}>
              <Td item={item.storage} dark={dark}>
                <StyledImg
                  src={item.path[0]}
                  alt="item"
                  storage={item.storage}
                />
              </Td>
              <Td dark={dark} item={item.storage}>
                {item.name}
              </Td>
              <Td dark={dark} item={item.storage}>
                {item.color}
              </Td>
              <StatusTd dark={dark} item={item.storage}>
                {item.storage === 0 ? "არააქტიური" : "აქტიური"}
              </StatusTd>
              <Td dark={dark} item={item.storage}>
                {item.size}
              </Td>
              <Td dark={dark} item={item.storage}>
                <Button
                  variant="contained"
                  onClick={() =>
                    setUpdateStorage({ id: item._id, storage: -1 })
                  }
                >
                  -1
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    setUpdateStorage({ id: item._id, storage: -3 })
                  }
                >
                  -3
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    setUpdateStorage({ id: item._id, storage: -5 })
                  }
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
              <Td dark={dark} item={item.storage}>
                <Button color="error" onClick={() => deleteItem(item._id)}>
                  <Delete />
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableGenerator>
    </>
  );
};

export default Storages;

const TableGenerator = styled.table(
  () => css`
    width: 100%;
    border: 3px dashed #7b61ff;
    border-radius: 10 px;
  `
);

const Thead = styled.thead(
  ({ dark }: { dark: boolean }) => css`
    width: 100%;
    height: 48px;
    background: ${dark ? "#484D58" : "#F0F0F1"};
  `
);
const Td = styled.td(
  ({ item, dark }: { item: number; dark: boolean }) => css`
    font-weight: 600;
    height: 48px;
    text-align: center;
    color: ${item === 0 ? "red" : ""};
    background: ${dark ? "#141b29" : "#FFF"};
    opacity: ${item === 0 ? "0.6" : "1"};
  `
);
const StatusTd = styled.td(
  ({ item, dark }: { item: number; dark: boolean }) => css`
    color: ${item === 0 ? "red" : "#00BDB0"};
    font-weight: 600;
    height: 48px;
    text-align: center;
    color: ${item === 0 ? "red" : ""};
    background: ${dark ? "#141b29" : "#FFF"};
    opacity: ${item === 0 ? "0.5" : "1"};
  `
);

const StyledImg = styled.img(
  ({ storage }: { storage: number }) => css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: ${storage === 0 ? "2px solid red" : ""};
  `
);
