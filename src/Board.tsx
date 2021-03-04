import { FC } from 'react';

import { SquareProperty } from './SquareStatus';
import Square from './Square';

// const range = (start: number, stop: number, step: number): number[] =>
//   Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

type Props = {
  board: SquareProperty[][];
};

const Board: FC<Props> = ({ board }) => (
  <table>
    {board.map((row) => (
      <tr>
        {row.map((item) => (
          <Square property={item} />
        ))}
      </tr>
    ))}
  </table>
);

export default Board;
