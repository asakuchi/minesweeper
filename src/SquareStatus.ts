export type SquareStatus = 'OPEN' | 'CLOSED' | 'FLAG';

export type SquareProperty = {
  status: SquareStatus;
  hasBomb: boolean;
};
