/* eslint-disable no-restricted-syntax */
import { Plateau } from "./Plateau";
import { ILandingData, Position, Orientation, Rover } from "./Rover";

const plateauMatrix = [5, 5];
const Rovers = [
  "Rover1 Landing:1 2 N",
  "Rover2 Landing:3 3 E",
  "Rover1 Instructions:LMLMLMLMM",
  "Rover2 Instructions:MRRMMRMRRM",
];

const LandingData = (dataStr: string): ILandingData => {
  const [x, y, orientation] = dataStr.split(":")[1].trim().split(" ");

  if (!Number(x) || !Number(y)) {
    throw Error("Invalid landing positions.");
  }

  if (!Object.values(Orientation).includes(<Orientation>orientation)) {
    throw Error("Invalid orientation.");
  }

  const position: Position = {
    x: Number(x),
    y: Number(y),
  };

  return {
    position,
    orientation,
  } as ILandingData;
};

export const ValidatePlateau = (data: Array<number>): Plateau => {
  if (Number.isNaN(data[0]) || Number.isNaN(data[1]) || data.length < 2) {
    throw Error("Invalid Plateau dimensions. It should be a matrix of numbers");
  }
  return new Plateau(data[0], data[1]);
};

export const CreateRoversData = (data: string[]): Array<Rover> => {
  if (!data || data.length < 1) {
    throw new Error("Check data informations");
  }
  const roverMaps = new Map();

  for (const roverData of data) {
    const roverName = roverData.split(" ")[0].trim();

    if (roverData.indexOf("Landing") > 0) {
      const { position, orientation }: ILandingData = LandingData(roverData);

      const rover = roverMaps.get(roverName);
      if (rover) {
        rover.landing = {
          position: { x: Number(position.x), y: Number(position.y) },
          orientation,
        };
      } else {
        const newRover = new Rover(
          roverName,
          {
            position: { x: Number(position.x), y: Number(position.y) },
            orientation,
          },
          null
        );
        roverMaps.set(roverName, newRover);
      }
    }
    if (roverData.indexOf("Instructions") > 0) {
      const instructionsData = roverData.split(":")[1].trim().split("");

      const rover = roverMaps.get(roverName);
      if (rover) {
        rover.instructions = instructionsData;
      } else {
        const newRover = new Rover(roverName, null, instructionsData);
        roverMaps.set(roverName, newRover);
      }
    }
  }

  return Array.from(roverMaps.values());
};

const MarsRover = () => {
  const plateau = ValidatePlateau(plateauMatrix);
  const rovers = CreateRoversData(Rovers);
  rovers.map((rover) => {
    rover.landed(plateau);
    const status = rover.navigate(plateau);
    console.log(status);
    return status;
  });
};

MarsRover();
