import { RoverData } from "../types";

export const processInput = (input: string[]): { plateauWidth: number; plateauHeight: number; roversData: RoverData[] } => {
  if (!input.length) {
    throw new Error("Input cannot be empty");
  }

  // Validate the first line (plateau size)
  const [plateauWidth, plateauHeight] = input[0].split(" ").map((value) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new Error("Invalid plateau dimensions. Must be valid numbers.");
    }
    return parsed;
  });

  const roversData: RoverData[] = [];
  for (let i = 1; i < input.length; i += 2) {
    const position = input[i];
    const instructions = input[i + 1];

    if (!position || !instructions) {
      throw new Error(`Incomplete data for rover at index ${i}. Both position and instructions are required.`);
    }

    roversData.push({ position, instructions });
  }

  return { plateauWidth, plateauHeight, roversData };
};
