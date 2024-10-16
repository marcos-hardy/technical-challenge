import RoverSquad from "./RoverSquad";
import { RoverData } from "./types";

export const processInput = (input: string[]) => {
  // The first line of input is the upper-right coordinates of the plateau
  const [plateauWidth, plateauHeight] = input[0].split(" ").map((value) => parseInt(value));

  // Create a new RoverSquad instance with the plateau size
  const roverSquad = new RoverSquad({ width: plateauWidth, height: plateauHeight });

  /*
   The first line of the input is the plateau coordinates so we need to start with index 1
   Each rover has two lines of input so we want to increment index by 2 
   This insures each iteration we get the rovers coordinates and series of commands for each rover
  */

  const roversData: RoverData[] = [];

  for (let i = 1; i < input.length; i += 2) {
    // rover's position e.g 1 2 N
    const position = input[i];
    // series of instructions telling the rover how to explore the plateau e.g LMLMLMLMM
    const instructions = input[i + 1];

    roversData.push({ position, instructions });
  }

  return roverSquad.deployRovers(roversData).map((roverPosition) => roverPosition);
};

const result = processInput(["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"]);

console.log("result:", result);
