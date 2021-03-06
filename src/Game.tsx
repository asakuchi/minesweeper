import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Container, Segment, Dropdown, Button } from 'semantic-ui-react';
import Board from './Board';
import { SquareProperty } from './SquareStatus';

const Game: FC = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [bombNumber, setBombNumber] = useState(0);

  const getArroundCell = useCallback(
    (row: number, column: number): number[][] => {
      const cells: number[][] = [];

      for (let i = row - 1; i < row + 2; i += 1) {
        for (let j = column - 1; j < column + 2; j += 1) {
          if (
            i >= 0 &&
            i < height &&
            j >= 0 &&
            j < width &&
            (i !== row || j !== column)
          ) {
            cells.push([i, j]);
          }
        }
      }

      return cells;
    },
    [width, height],
  );

  const initializeBoard = useCallback(() => {
    const initialBoard = [...new Array<SquareProperty>(height)].map((_) =>
      [...new Array<SquareProperty>(width)].map((__) => ({
        hasBomb: false,
        open: false,
        hasFlag: false,
        bombNumberAround: 0,
      })),
    );

    const allIndexes: number[][] = [];
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        allIndexes.push([i, j]);
      }
    }

    const shuffle = <T,>(array: T[]): T[] => {
      const newArray = array.slice();

      for (let i = 0; i < newArray.length; i += 1) {
        const j = Math.floor(Math.random() * i + 1);
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }

      return newArray;
    };

    shuffle(allIndexes)
      .splice(0, bombNumber)
      .forEach(([rowRandom, columnRandom]) => {
        initialBoard[rowRandom][columnRandom].hasBomb = true;
        initialBoard[rowRandom][columnRandom].bombNumberAround = 1;

        getArroundCell(rowRandom, columnRandom).forEach(([i, j]) => {
          initialBoard[i][j].bombNumberAround += 1;
        });
      });

    return initialBoard;
  }, [width, height, bombNumber, getArroundCell]);

  const [board, setBoard] = useState<SquareProperty[][]>(initializeBoard());

  const [isGameOver, setGameOver] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const difficultyOptions = [
    { key: 'small', value: 'small', text: 'Small', size: [8, 8, 10] },
    { key: 'medium', value: 'medium', text: 'Medium', size: [20, 10, 20] },
    { key: 'large', value: 'large', text: 'Large', size: [30, 15, 40] },
  ];

  const [difficulty, setDifficulty] = useState(difficultyOptions[0].size);

  // eslint-disable-next-line
  const changeDifficulty = (event: SyntheticEvent, data: any) => {
    // eslint-disable-next-line
    console.log(data);

    setDifficulty(
      // eslint-disable-next-line
      difficultyOptions.find((item) => item.value === data.value)!.size,
    );
  };

  useEffect(() => {
    setBoard(initializeBoard());

    setGameOver(false);
    setSuccess(false);

    return () => {
      void 0;
    };
  }, [initializeBoard]);

  useEffect(() => {
    const [localWidth, localHeight, localBombNumber] = difficulty;

    setWidth(localWidth);
    setHeight(localHeight);
    setBombNumber(localBombNumber);

    return () => {
      void 0;
    };
  }, [difficulty]);

  useEffect(() => {
    if (board.length !== 0) {
      if (
        board
          .reduce((pre, current) => {
            pre.push(...current);

            return pre;
          }, [])
          .filter((item) => !item.open)
          .filter((item) => !item.hasBomb).length === 0
      ) {
        setGameOver(true);
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    }

    return () => {
      void 0;
    };
  }, [board]);

  const openCell = (i: number, j: number): void => {
    if (isGameOver) return;

    if (board[i][j].hasBomb) {
      setGameOver(true);
    }

    setBoard((prevBoard) => {
      const OpenSaffeCellsAround = (
        innerBoard: SquareProperty[][],
        k: number,
        l: number,
      ): void => {
        if (innerBoard[k][l].open) {
          return;
        }

        // eslint-disable-next-line no-param-reassign
        innerBoard[k][l].open = true;

        if (innerBoard[k][l].bombNumberAround !== 0) {
          return;
        }

        getArroundCell(k, l)
          .filter(([m, n]) => !innerBoard[m][n].open)
          // .filter(([m, n]) => innerBoard[m][n].bombNumberAround === 0)
          .forEach(([m, n]) => {
            OpenSaffeCellsAround(innerBoard, m, n);
          });
      };

      const copy = prevBoard.concat();

      if (copy[i][j].bombNumberAround === 0) {
        OpenSaffeCellsAround(copy, i, j);
      }

      copy[i][j].open = true;

      return copy;
    });
  };

  const setFlag = (i: number, j: number): void => {
    if (isGameOver) return;

    setBoard((prevBoard) => {
      const copy = prevBoard.concat();

      copy[i][j].hasFlag = true;

      return copy;
    });
  };

  const unsetFlag = (i: number, j: number): void => {
    if (isGameOver) return;

    setBoard((prevBoard) => {
      const copy = prevBoard.concat();

      copy[i][j].hasFlag = false;

      return copy;
    });
  };

  const reset = () => {
    setGameOver(false);
    setSuccess(false);

    setBoard(initializeBoard());
  };

  let text = 'Look for mins!';

  if (isSuccess) {
    text = '🎉🎉🎉🎉🎉 Success 🎉🎉🎉🎉🎉';
  } else if (isGameOver) {
    text = '💣💣💣💣💣 Game Over 💣💣💣💣💣';
  }

  return (
    <Container>
      <Segment>
        <Segment>Mine Sweeper</Segment>
        <Segment>
          difficulty
          <Dropdown
            selection
            options={difficultyOptions}
            defaultValue="small"
            onChange={changeDifficulty}
          />
          <Button onClick={reset}>Reset</Button>
        </Segment>

        <Segment>{text}</Segment>

        <Segment>
          <div className="game">
            <div className="game-board">
              <Board
                board={board}
                openCell={openCell}
                setFlag={setFlag}
                unsetFlag={unsetFlag}
              />
            </div>
            <div className="game-info">
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </div>
        </Segment>
      </Segment>
    </Container>
  );
};

export default Game;
