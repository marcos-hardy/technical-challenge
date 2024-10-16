import { CardinalDirection, Instruction, PlateauSize, RoverData, RoverPosition } from "./types";

class RoverSquad {
  plateauX: number;
  plateauY: number;

  constructor(plateauSize: PlateauSize) {
    this.plateauX = plateauSize.width;
    this.plateauY = plateauSize.height;
  }

  public deployRovers(roversData: RoverData[]): RoverPosition[] {
    // Loop over each rover data and deploy the rovers synchronously
    return roversData.map(({ position, instructions }) => {
      const finalPosition = this.rover(position, instructions);
      return finalPosition;
    });
  }

  private rover(roversPosition: string, instructions: string): RoverPosition {
    // The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation.
    const [x, y, roverCardinalDirection] = roversPosition.split(" ") as [string, string, CardinalDirection];

    // parse the rover x and y position to integers
    const roverX = parseInt(x);
    const roverY = parseInt(y);

    let finalRoverPosition: RoverPosition = { x: roverX, y: roverY, cardinalDirection: roverCardinalDirection };

    // Instructions are a string of the following possible values: "L", "R", "M".
    // Loop over each letter and process the corresponding instruction
    // Update the final position of the rover each time an instruction is processed
    for (const instruction of instructions) {
      finalRoverPosition = this.move(finalRoverPosition.x, finalRoverPosition.y, finalRoverPosition.cardinalDirection, instruction as Instruction);
    }

    return finalRoverPosition;
  }

  private move(x: number, y: number, cardinalDirection: CardinalDirection, instruction: Instruction): RoverPosition {
    switch (instruction) {
      case "L":
        // 'L' makes the rover spin 90 degrees left
        return { x, y, cardinalDirection: this.turnLeft(cardinalDirection) };
      case "R":
        // 'R' makes the rover spin 90 degrees right
        return { x, y, cardinalDirection: this.turnRight(cardinalDirection) };
      case "M":
        // 'M' means move forward one grid point, and maintain the same heading.
        const [newX, newY] = this.moveForward(x, y, cardinalDirection);
        return { x: newX, y: newY, cardinalDirection };
      default:
        throw new Error(`Invalid instruction: ${instruction}`);
    }
  }

  private turnLeft(cardinalDirection: CardinalDirection): CardinalDirection {
    const leftTurn: { [key in CardinalDirection]: CardinalDirection } = { N: "W", W: "S", S: "E", E: "N" };
    return leftTurn[cardinalDirection];
  }

  private turnRight(cardinalDirection: CardinalDirection): CardinalDirection {
    const rightTurn: { [key in CardinalDirection]: CardinalDirection } = { N: "E", E: "S", S: "W", W: "N" };
    return rightTurn[cardinalDirection];
  }

  private moveForward(x: number, y: number, cardinalDirection: CardinalDirection): [number, number] {
    let [newX, newY] = [x, y];

    switch (cardinalDirection) {
      case "N":
        newY += 1;
        break;
      case "S":
        newY -= 1;
        break;
      case "E":
        newX += 1;
        break;
      case "W":
        newX -= 1;
        break;
    }

    // Check if the new position is within the plateau size
    if (this.isWithinBounds(newX, newY)) {
      return [newX, newY];
    } else {
      console.warn(`Cannot move ${cardinalDirection}. Rover is at the edge of the plateau.`);
      return [x, y]; // Return the original rover position if the instruction is out of bounds
    }
  }

  private isWithinBounds(newX: number, newY: number): boolean {
    // Check if the new position is within the plateau size
    return newX >= 0 && newY >= 0 && newX <= this.plateauX && newY <= this.plateauY;
  }
}

export default RoverSquad;
