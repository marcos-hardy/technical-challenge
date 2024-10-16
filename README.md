# Mars Rover Technical Challenge

## Overview

This project is a solution to the Mars Rover technical challenge. It simulates a squad of robotic rovers that are deployed on a rectangular plateau on Mars. The rovers receive instructions to move around the plateau and send back their final coordinates and orientations.

Each rover's position is represented by x and y coordinates, along with a cardinal direction (`N`, `E`, `S`, `W`). NASA sends movement commands to each rover to rotate them (`L` for left, `R` for right) or move them forward (`M`). The rovers process these instructions one by one, ensuring that each rover completes its movements before the next one starts.

## Features

- Deploys multiple rovers on a rectangular plateau and processes each rover's movement sequentially.
- Handles boundary conditions, preventing rovers from moving outside the plateau.
- Provides detailed input validation to ensure rovers are deployed with the correct instructions.

## How It Works

1. **Plateau Definition**: The plateau size is defined by the first input line. The lower-left corner is assumed to be `(0, 0)`.
2. **Rover Positioning**: Each rover is given an initial position and a series of movement instructions. The position consists of the x, y coordinates and the direction the rover is facing.
3. **Commands**: 
   - `L`: Turns the rover 90 degrees to the left.
   - `R`: Turns the rover 90 degrees to the right.
   - `M`: Moves the rover forward one grid square, maintaining the current direction.

The rovers process their instructions sequentially, ensuring that no rover starts moving until the previous one has finished.

## Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v12 or above)
- **npm** (v6 or above)

### Installation

1. Clone this repository to your local machine:
   ```
   git clone git@github.com:marcos-hardy/technical-challenge.git
   cd technical-challenge
    ```
   
2. Install the necessary dependencies:
   ```
   npm install
   ```

## Running the Application

To run the Mars Rover simulation, use the following command:
```
npm run start
```
This command will run the default input and display the final positions of the rovers.

You can modify the input directly within the src/index.ts file.

## Running tests

The project uses Jest for unit testing. To run the tests:

1. Ensure that the dependencies are installed (`npm install`).
2.	Run the tests using the following command:
```
npm run test
```
This will execute all the test cases. Both integration and unit tests.


### Sample Input
To understand how the application works, here’s an example of input:
```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```
- The first line represents the size of the plateau.
- The second line is the initial position of the first rover.
- The third line is the instructions for the first rover.
- The fourth and fifth lines are the position and instructions for the second rover.

## Expected Output
For the above input, the expected output would be:
```
1 3 N
5 1 E
```
This indicates that the first rover ends up at position (1, 3) facing North, and the second rover ends up at position (5, 1) facing East.