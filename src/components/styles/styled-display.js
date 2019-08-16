import styled from "styled-components";

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0;
  margin-bottom: 20px;
  padding: 20px;
  border: 4px solid #333333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${props => (props.isGameOver ? "red" : "#999999")};
  background-color: #000000;
  font-size: 0.8rem;
`;
