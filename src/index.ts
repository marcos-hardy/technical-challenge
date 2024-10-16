import { processInput } from "./helpers";
import { RoverSquad } from "./class/RoverSquad";
import { RoverPosition } from "./types";

export const processAndOutputRovers = (input: string[]): RoverPosition[] => {
  const { plateauWidth, plateauHeight, roversData } = processInput(input);

  // Create a new RoverSquad instance with the plateau dimensions
  const roverSquad = new RoverSquad({ width: plateauWidth, height: plateauHeight });

  const finalPositions = roverSquad.deployRovers(roversData);

  return finalPositions;
};

// Test data input
const input = ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"];

// Process input and output results and receive an array of rover positions
const result = processAndOutputRovers(input);

console.log("result:", result);
