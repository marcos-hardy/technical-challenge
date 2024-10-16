import { RoverData } from "../types";
import { processInput } from "./helpers";

describe("processInput", () => {
  it("should correctly process valid input", () => {
    const input = ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"];

    const expectedOutput = {
      plateauWidth: 5,
      plateauHeight: 5,
      roversData: [
        { position: "1 2 N", instructions: "LMLMLMLMM" },
        { position: "3 3 E", instructions: "MMRMMRMRRM" },
      ] as RoverData[],
    };

    const result = processInput(input);

    expect(result).toEqual(expectedOutput);
  });

  it("should throw an error if input is empty", () => {
    expect(() => {
      processInput([]);
    }).toThrow("Input cannot be empty");
  });

  it("should throw an error if plateau dimensions are invalid", () => {
    const invalidInput = ["5 X", "1 2 N", "LMLMLMLMM"];

    expect(() => {
      processInput(invalidInput);
    }).toThrow("Invalid plateau dimensions. Must be valid numbers.");
  });

  it("should throw an error if rover data is incomplete", () => {
    const incompleteInput = ["5 5", "1 2 N"];

    expect(() => {
      processInput(incompleteInput);
    }).toThrow("Incomplete data for rover at index 1. Both position and instructions are required.");
  });

  it("should correctly handle multiple rovers", () => {
    const input = ["10 10", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM", "2 2 W", "MMMLL"];

    const expectedOutput = {
      plateauWidth: 10,
      plateauHeight: 10,
      roversData: [
        { position: "1 2 N", instructions: "LMLMLMLMM" },
        { position: "3 3 E", instructions: "MMRMMRMRRM" },
        { position: "2 2 W", instructions: "MMMLL" },
      ] as RoverData[],
    };

    const result = processInput(input);

    expect(result).toEqual(expectedOutput);
  });
});
