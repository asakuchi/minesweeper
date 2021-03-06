import { FC, useState } from 'react';
import { Container, Segment, Button, Divider } from 'semantic-ui-react';
import Board from './Board';
import { SquareProperty } from './SquareStatus';

const Game: FC = () => {
  const initializeBoard = (
    row: number,
    column: number,
    bombNumber: number,
  ): SquareProperty[][] => {
    const initialBoard = [...new Array<SquareProperty>(row)].map((_) =>
      [...new Array<SquareProperty>(column)].map((__) => ({
        hasBomb: false,
        open: false,
        hasFlag: false,
        bombNumberAround: 0,
      })),
    );

    // const initialBoard = [
    //   [
    //     {
    //       hasBomb: false,
    //       open: true,
    //       hasFlag: false,
    //       bombNumberAround: 0,
    //     },
    //   ],
    // ];

    const allIndexes: number[][] = [];
    for (let i = 0; i < row; i += 1) {
      for (let j = 0; j < column; j += 1) {
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

        for (let i = rowRandom - 1; i < rowRandom + 2; i += 1) {
          for (let j = columnRandom - 1; j < columnRandom + 2; j += 1) {
            if (i >= 0 && i < row && j >= 0 && j < column) {
              initialBoard[i][j].bombNumberAround += 1;
            }
          }
        }
      });

    return initialBoard;
  };

  const [board, setBoard] = useState<SquareProperty[][]>(
    initializeBoard(4, 5, 5),
  );

  const openCell = (i: number, j: number): void => {
    setBoard((prevBoard) => {
      const copy = prevBoard.concat();
      copy[i][j].open = true;

      return copy;
    });
  };

  // const getArroundCell = (i: number, j: number) => {};

  return (
    <Container>
      <Segment>
        <Segment>hello</Segment>

        <Button>Click Here</Button>

        <Divider />

        <Segment>
          <div className="game">
            <div className="game-board">
              <Board board={board} openCell={openCell} />
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
