import { Rover } from "./Rover";

export class Plateau {
  width: number;
  height: number;
  rovers: Rover[];

  constructor(width: number, height: number) {
    if (width <= 0 || height <= 0) {
      throw new Error("Plateau infos should be numbers and grader than zero");
    }
    this.width = width;
    this.height = height;
    this.rovers = [];
  }
}
