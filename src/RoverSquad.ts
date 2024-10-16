import { PlateauSize } from "@types";

class RoverSquad {
  plateauX: number;
  plateauY: number;

  constructor(plateauSize: PlateauSize) {
    this.plateauX = plateauSize.width;
    this.plateauY = plateauSize.height;
  }
}

export default RoverSquad;
