import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CaculateNode, ListNode } from "./classes";

type DirectionType = "ArrowLeft" | "ArrowRight" | "ArrowUp" | "ArrowDown";

const INIT_SNAKE_POSITION: [number, number] = [5, 5];

export function useBoardGame() {
  const caculator = useMemo(() => new CaculateNode(INIT_SNAKE_POSITION), []);

  const [direction, setDirection] = useState<DirectionType>("ArrowLeft");
  const [cells, setCells] = useState(generateEmptyCells());
  const [gameover, setGameover] = useState(false);
  const [score, setScore] = useState(caculator.getScore());

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const replay = () => {
    setCells(generateCells(INIT_SNAKE_POSITION));
    setGameover(false);
    setDirection("ArrowLeft");
    caculator.reset(INIT_SNAKE_POSITION);
    setScore(caculator.getScore());
  };

  const handleMove = useCallback(() => {
    const prevHead = caculator.getHead();
    const [prevRow, prevCol] = prevHead.position;

    const move = (row: number, col: number) => {
      const prevTail = caculator.update([row, col]) as ListNode;
      if (cells[row][col] === 2) {
        const score = caculator.append(prevTail.position);
        setScore(score);
      }
      const [tailRow, tailCol] = prevTail.position;
      if (cells[row][col] === 1) {
        if (row !== tailRow || col !== tailCol) {
          setGameover(true);
          return;
        }
      }

      setCells((prev) => {
        const prevCells = prev.map((row) => row.slice());
        if (prevCells[row][col] !== 2) {
          prevCells[tailRow][tailCol] = 0;
        } else {
          let random = getRandomPosition(10);
          while (cells[random[0]][random[1]] === 1) {
            random = getRandomPosition(10);
          }
          const [randomRow, randomCol] = random;
          prevCells[randomRow][randomCol] = 2;
        }
        prevCells[row][col] = 1;
        return prevCells;
      });
    };

    switch (direction) {
      case "ArrowLeft":
        if (prevCol <= 0) {
          setGameover(true);
          return;
        }
        move(prevRow, prevCol - 1);
        return;
      case "ArrowRight":
        if (prevCol >= 9) {
          setGameover(true);
          return;
        }
        move(prevRow, prevCol + 1);
        return;
      case "ArrowUp":
        if (prevRow <= 0) {
          setGameover(true);
          return;
        }
        move(prevRow - 1, prevCol);
        return;
      case "ArrowDown":
        if (prevRow >= 9) {
          setGameover(true);
          return;
        }
        move(prevRow + 1, prevCol);
        return;
      default:
        return;
    }
  }, [caculator, direction, cells]);

  useEffect(() => {
    setCells(generateCells(INIT_SNAKE_POSITION));
  }, []);

  useEffect(() => {
    if (gameover) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      intervalRef.current = setInterval(handleMove, 600);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [handleMove, gameover]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const eventKey = event.key;
      if (isDirectionType(eventKey)) {
        setDirection((prev) => {
          if (caculator.getLength() > 1) {
            // 不能回頭
            if (
              (eventKey === "ArrowUp" && prev === "ArrowDown") ||
              (eventKey === "ArrowDown" && prev === "ArrowUp") ||
              (eventKey === "ArrowLeft" && prev === "ArrowRight") ||
              (eventKey === "ArrowRight" && prev === "ArrowLeft")
            )
              return prev;
          }
          return eventKey;
        });
      }
    };
    if (gameover) {
      window.removeEventListener("keydown", handleKeyDown);
    } else {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameover, caculator]);

  return { cells, score, gameover, replay };
}

function isDirectionType(key: string): key is DirectionType {
  return ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key);
}

function generateEmptyCells() {
  const cells: Array<Array<number>> = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(0);
    }
    cells.push(row);
  }
  return cells;
}

function generateCells(focus: [number, number]): Array<Array<number>> {
  const cells: Array<Array<number>> = [];
  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(0);
    }
    cells.push(row);
  }
  const [row, col] = focus;
  cells[row][col] = 1;
  let random = getRandomPosition(10);
  while (random[0] === row && random[1] === col) {
    random = getRandomPosition(10);
  }

  cells[random[0]][random[1]] = 2;
  return cells;
}

function getRandomPosition(max: number): [number, number] {
  const row = Math.floor(Math.random() * max);
  const col = Math.floor(Math.random() * max);
  return [row, col];
}
