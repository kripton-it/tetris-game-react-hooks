import React from "react";
import Cell from "./Cell";

import { STAGE_WIDTH, STAGE_HEIGHT } from '../utils/gameHelpers'

import { StyledStage } from './styles/styled-stage'

const Stage = ({ stage }) => {
  return (
    <StyledStage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
      {stage.map(row =>
        row.map((cell, index) => <Cell key={index} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

export default Stage;
