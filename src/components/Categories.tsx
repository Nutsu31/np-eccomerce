import React from "react";
import styled, { css } from "styled-components";
interface CategoriesTypes {
  name: string;
  option: Array<string>;
  setFilterByCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Categories = ({ name, option, setFilterByCategory }: CategoriesTypes) => {
  return (
    <Container>
      <span
        style={{
          fontSize: 18,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {name}
      </span>
      {option.map((item) => (
        <div key={item}>
          <input
            type="checkbox"
            id={item}
            onChange={(e) =>
              e.target.checked
                ? setFilterByCategory(item)
                : setFilterByCategory("")
            }
          />
          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </Container>
  );
};

export default Categories;

const Container = styled.aside(
  () => css`
    width: 200px;
    min-height: 30px;
    margin: 24px 0;
    display: flex;
    flex-direction: column;
  `
);
