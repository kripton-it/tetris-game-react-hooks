import styled from "styled-components";

export const StyledCell = styled.div`
  width: auto;
  background-color: rgba(${props => props.color}, 0.8);
  border-style: solid;
  border-width: ${props => (props.type === "empty" ? 0 : "4px")};
  border-bottom-color: rgba(${props => props.color}, 0.1);
  border-right-color: rgba(${props => props.color}, 1);
  border-top-color: rgba(${props => props.color}, 1);
  border-left-color: rgba(${props => props.color}, 0.3);
`;
