import { processAndOutputRovers } from "../src/index";

describe("Rover squad integration tests", () => {
  // This test also tests the sequence of the rovers as we verify the order of the array in toEqual
  it.each([
    // Test case using the default test data provided
    {
      input: ["5 5", "1 2 N", "LMLMLMLMM", "3 3 E", "MMRMMRMRRM"],
      expectedOutput: [
        { x: 1, y: 3, cardinalDirection: "N" },
        { x: 5, y: 1, cardinalDirection: "E" },
      ],
    },
    {
      // Test case where rover moves up to the boundary but doesn't exceed it
      input: ["5 5", "0 0 N", "MMMMM", "4 4 E", "MMMMM"],
      expectedOutput: [
        { x: 0, y: 5, cardinalDirection: "N" }, // Moves north to the top boundary
        { x: 5, y: 4, cardinalDirection: "E" }, // Moves east to the right boundary
      ],
    },
    {
      // Test case where rover spins in place and doesn't move
      input: ["5 5", "2 2 N", "LLLL", "3 3 W", "RRRR"],
      expectedOutput: [
        { x: 2, y: 2, cardinalDirection: "N" }, // Spun left four times, no movement
        { x: 3, y: 3, cardinalDirection: "W" }, // Spun right four times, no movement
      ],
    },
    {
      // Test case where rovers start at the same point but move in different directions
      input: ["5 5", "1 1 N", "MMRMM", "1 1 S", "LLMMM"],
      expectedOutput: [
        { x: 3, y: 3, cardinalDirection: "E" }, // Moves north, then turns right and moves east
        { x: 1, y: 4, cardinalDirection: "N" }, // Moves north after turning left twice
      ],
    },
    {
      // Test case where a rover tries to move outside the boundary
      input: ["5 5", "4 4 E", "MMMMM", "0 0 S", "MMMMM"],
      expectedOutput: [
        { x: 5, y: 4, cardinalDirection: "E" }, // Stops at eastern boundary
        { x: 0, y: 0, cardinalDirection: "S" }, // Stops at southern boundary
      ],
    },
  ])("should process the input and return the expected rover positions in the correct order", ({ input, expectedOutput }) => {
    const result = processAndOutputRovers(input);

    expect(result).toEqual(expectedOutput);
  });
});
