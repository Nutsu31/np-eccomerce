import React from "react";
import styled, { css } from "styled-components";
import { DataTypes } from "./functions";

const Storages = ({ data }: { data: Array<DataTypes> }) => {
  return (
    <div style={{ width: "100%" }}>
      <div>
        <TableGenerator>
          <Thead>
            <tr>
              <th>სურათი</th>
              <th>სახელი</th>
              <th>ფერი</th>
              <th>ზომა</th>
              <th>დარჩენილი რაოდენობა</th>
            </tr>
          </Thead>
          <tbody>
            {data.map((item) => (
              <tr>
                <Td item={item.storage}>
                  <img
                    src={`http://localhost:5001/uploads/${item.path}`}
                    alt="item"
                    style={
                      item.storage === 0
                        ? { border: "10px solid red" }
                        : undefined
                    }
                    width={86}
                  />
                </Td>
                <Td item={item.storage}>{item.name}</Td>
                <Td item={item.storage}>{item.color}</Td>
                <Td item={item.storage}>{item.size}</Td>
                <Td item={item.storage}>დარჩენილია: {item.storage}</Td>
              </tr>
            ))}
          </tbody>
        </TableGenerator>
      </div>
    </div>
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
