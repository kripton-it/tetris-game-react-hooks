import styled from "styled-components";

export const StyledStartButton = styled.button`
  box-sizing: border-box;
  margin: 0;
  margin-bottom: 20px;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: #ffffff;
  background-color: #333333;
  font: inherit;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  transition: background-color 0.5s;

  &:hover {
    background-color: #222222;
  }
`;
