import { FC } from 'react';
import { Container, Segment, Button, Divider } from 'semantic-ui-react';
import Board from './Board';
import { SquareProperty } from './SquareStatus';

// const range = (start: number, stop: number, step: number): number[] =>
//   Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const Game: FC = () => {
  // const boardSize = [5, 5];

  // const board: SquareProperty[][] = [...new Array(5)].map((_) => {
  //   return [...new Array(5)].map((__) => ({
  //     status: 'OPEN',
  //     hasBomb: false,
  //   }));
  // });

  const board: SquareProperty[][] = [
    [
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
    ],
    [
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
    ],
    [
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
    ],
    [
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
      {
        status: 'OPEN',
        hasBomb: false,
      },
    ],
  ];

  board[1][1].hasBomb = true;

  return (
    <Container>
      <Segment>
        <Segment>hello</Segment>

        <Button>Click Here</Button>

        <Divider />

        <Segment>
          <div className="game">
            <div className="game-board">
              <Board board={board} />
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
