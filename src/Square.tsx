import { FC } from 'react';

import { SquareProperty } from './SquareStatus';
import './Square.css';

type Props = {
  property: SquareProperty;
};

const Square: FC<Props> = ({ property }) => (
  <button type="button" onClick={() => true}>
    <td className="square">{property.hasBomb ? '💣' : 'n'}</td>
  </button>
);

export default Square;
