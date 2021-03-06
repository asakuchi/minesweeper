import { FC } from 'react';

import { SquareProperty } from './SquareStatus';
import './Square.css';

type Props = {
  property: SquareProperty;
  i: number;
  j: number;
  openCell: (i: number, j: number) => void;
  setFlag: (i: number, j: number) => void;
  unsetFlag: (i: number, j: number) => void;
};

const Square: FC<Props> = ({
  property,
  i,
  j,
  openCell,
  setFlag,
  unsetFlag,
}) => {
  // const [disabled, setDisabled] = useState(false);

  let text = '❔';

  const bombNumberAround = property.bombNumberAround.toString();

  if (property.open) {
    text = property.hasBomb ? '💣' : bombNumberAround;
  } else if (property.hasFlag) {
    text = '🚩';
  }

  return (
    <div className="table_cell">
      <button
        type="button"
        className="square"
        disabled={property.open}
        onClick={() => {
          openCell(i, j);
        }}
        onContextMenu={(e) => {
          if (property.hasFlag) {
            unsetFlag(i, j);
          } else {
            setFlag(i, j);
          }
          e.preventDefault();
        }}
      >
        {text}
      </button>
    </div>
  );
};
export default Square;
