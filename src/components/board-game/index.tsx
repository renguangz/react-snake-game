"use client";

import { useBoardGame } from "@/hooks";
import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const GameOverMessage = styled.span`
  color: red;
`;

interface BoardContainerProps {
  $gamever: boolean;
}

const BoardContainer = styled.div<BoardContainerProps>`
  display: grid;
  grid-template-columns: repeat(10, 50px);
  grid-template-rows: repeat(10, 50px);
  gap: 1px;
  background-color: #333;
  opacity: ${(props) => (props.$gamever ? 0.5 : 1)};
  padding: 1px;
  width: 509px;
  height: 509px;
`;

interface CellProps {
  $focus: boolean;
  $grow: boolean;
}

const Cell = styled.div<CellProps>`
  width: 50px;
  height: 50px;
  background-color: ${(props) =>
    props.$focus ? "orange" : props.$grow ? "green" : "#fff"};
`;

export function BoardGame() {
  const { score, gameover, cells, replay } = useBoardGame();

  return (
    <>
      <TitleContainer>
        <h1>Score: {score}</h1>
        {gameover && <GameOverMessage>遊戲結束</GameOverMessage>}
      </TitleContainer>
      <BoardContainer $gamever={gameover}>
        {cells.flat().map((cell, index) => (
          <Cell key={index} $focus={cell === 1} $grow={cell === 2} />
        ))}
      </BoardContainer>
      <button onClick={replay}>Replay</button>
    </>
  );
}
