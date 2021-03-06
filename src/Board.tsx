import { FC } from 'react';

import { SquareProperty } from './SquareStatus';
import Square from './Square';

import './Board.css';

// const range = (start: number, stop: number, step: number): number[] =>
//   Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

type Props = {
  board: SquareProperty[][];
  openCell: (i: number, j: number) => void;
  setFlag: (i: number, j: number) => void;
  unsetFlag: (i: number, j: number) => void;
};

// {row.map((item) => (
//   <Square property={item} />
// ))}

const Board: FC<Props> = ({ board, openCell, setFlag, unsetFlag }) => (
  <div className="table">
    {board.map((row, i) => (
      <div key={i.toString()} className="table_line">
        {row.map((item, j) => (
          <Square
            key={i.toString() + j.toString()}
            property={item}
            i={i}
            j={j}
            openCell={openCell}
            setFlag={setFlag}
            unsetFlag={unsetFlag}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Board;
