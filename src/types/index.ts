export type CardinalDirection = "N" | "E" | "S" | "W";

export type Instruction = "L" | "R" | "M";

export interface RoverPosition {
  x: number;
  y: number;
  cardinalDirection: CardinalDirection;
}

export interface PlateauSize {
  width: number;
  height: number;
}

export interface Rover {
  position: RoverPosition;
  instructions: Instruction[];
}

export type RoverData = {
  position: string;
  instructions: string;
};
