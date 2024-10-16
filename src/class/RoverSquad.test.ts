import { RoverSquad } from "./RoverSquad";
import { RoverData, RoverPosition } from "../types";

describe("RoverSquad", () => {
  let roverSquad: RoverSquad;

  beforeEach(() => {
    roverSquad = new RoverSquad({ width: 5, height: 5 });
  });

  describe("deployRovers", () => {
    it("should deploy multiple rovers and return correct final positions", () => {
      const roversData: RoverData[] = [
        { position: "1 2 N", instructions: "LMLMLMLMM" },
        { position: "3 3 E", instructions: "MMRMMRMRRM" },
      ];

      const expectedOutput: RoverPosition[] = [
        { x: 1, y: 3, cardinalDirection: "N" },
        { x: 5, y: 1, cardinalDirection: "E" },
      ];

      const result = roverSquad.deployRovers(roversData);

      expect(result).toEqual(expectedOutput);
    });
  });

  describe("move", () => {
    it("should turn left correctly", () => {
      const position = roverSquad["move"](1, 2, "N", "L");
      expect(position).toEqual({ x: 1, y: 2, cardinalDirection: "W" });
    });

    it("should turn right correctly", () => {
      const position = roverSquad["move"](1, 2, "N", "R");
      expect(position).toEqual({ x: 1, y: 2, cardinalDirection: "E" });
    });

    it("should move forward correctly in the direction it's facing", () => {
      const position = roverSquad["move"](1, 2, "N", "M");
      expect(position).toEqual({ x: 1, y: 3, cardinalDirection: "N" });
    });
  });

  describe("turnLeft", () => {
    it("should turn left from north to west", () => {
      const result = roverSquad["turnLeft"]("N");
      expect(result).toBe("W");
    });

    it("should turn left from west to south", () => {
      const result = roverSquad["turnLeft"]("W");
      expect(result).toBe("S");
    });
  });

  describe("turnRight", () => {
    it("should turn right from north to east", () => {
      const result = roverSquad["turnRight"]("N");
      expect(result).toBe("E");
    });

    it("should turn right from east to south", () => {
      const result = roverSquad["turnRight"]("E");
      expect(result).toBe("S");
    });
  });

  describe("moveForward", () => {
    it("should move forward to the north correctly", () => {
      const [newX, newY] = roverSquad["moveForward"](1, 2, "N");
      expect(newX).toBe(1);
      expect(newY).toBe(3);
    });

    it("should not move forward beyond the plateau boundary", () => {
      const [newX, newY] = roverSquad["moveForward"](5, 5, "N");
      expect(newX).toBe(5);
      expect(newY).toBe(5);
    });
  });

  describe("isWithinBounds", () => {
    it("should return true if within bounds", () => {
      const result = roverSquad["isWithinBounds"](3, 3);
      expect(result).toBe(true);
    });

    it("should return false if outside the plateau bounds", () => {
      const result = roverSquad["isWithinBounds"](6, 6);
      expect(result).toBe(false);
    });
  });
});
