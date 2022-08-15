import { Plateau } from "./Plateau";

export enum Instruction {
  L = "L",
  R = "R",
  M = "M",
}

export enum Orientation {
  N = "N",
  E = "E",
  W = "W",
  S = "S",
}

export type Position = {
  x: number;
  y: number;
};

export interface ILandingData {
  position: Position;
  orientation: Orientation;
}

export class Rover {
  name: string;
  position: Position;
  orientation: Orientation;
  landing: {
    position: Position;
    orientation: Orientation;
  };
  instructions: string[];

  constructor(
    name: string,
    landing: { position: Position; orientation: Orientation },
    instructions: string[]
  ) {
    this.name = name;
    this.landing = landing;
    this.instructions = instructions;
  }

  hasLanded(): boolean {
    return !!(this.position && this.orientation);
  }

  landed(plateau: Plateau): void {
    if (this.outOfPlateau(plateau, this.landing.position)) {
      throw new Error(`${this.name} out of plateau area`);
    }

    this.position = this.landing.position;
    this.orientation = this.landing.orientation;
    plateau.rovers.push(this);
  }

  navigate(plateau: Plateau): string {
    if (!this.hasLanded()) {
      throw new Error(`${this.name} not landed.`);
    }

    this.instructions.map((instruction) => {
      switch (instruction) {
        case Instruction.L:
          return this.turnLeft();
        case Instruction.R:
          return this.turnRight();
        case Instruction.M:
          return this.move(plateau);
        default:
          return this;
      }
    });
    return this.result();
  }

  turnRight(): Orientation {
    switch (this.orientation) {
      case Orientation.N:
        this.orientation = Orientation.E;
        break;
      case Orientation.E:
        this.orientation = Orientation.S;
        break;
      case Orientation.W:
        this.orientation = Orientation.N;
        break;
      case Orientation.S:
        this.orientation = Orientation.W;
        break;
      default:
        break;
    }
    return this.orientation;
  }

  turnLeft(): Orientation {
    switch (this.orientation) {
      case Orientation.N:
        this.orientation = Orientation.W;
        break;
      case Orientation.E:
        this.orientation = Orientation.N;
        break;
      case Orientation.W:
        this.orientation = Orientation.S;
        break;
      case Orientation.S:
        this.orientation = Orientation.E;
        break;
      default:
        break;
    }
    return this.orientation;
  }

  move(plateau: Plateau): Position {
    if (!this.hasLanded()) {
      throw new Error(`${this.name} cannot move without landing.`);
    }

    const newPosition = { ...this.position };
    switch (this.orientation) {
      case Orientation.N:
        newPosition.y += 1;
        break;
      case Orientation.E:
        newPosition.x += 1;
        break;
      case Orientation.S:
        newPosition.y -= 1;
        break;
      case Orientation.W:
        newPosition.x -= 1;
        break;
      default:
        break;
    }

    if (this.outOfPlateau(plateau, newPosition)) {
      throw new Error(`${this.name} movig out of plateau.`);
    }

    this.position = newPosition;
    return this.position;
  }

  outOfPlateau(plateau: Plateau, position: Position): boolean {
    return (
      position.x < 0 ||
      position.x > plateau.width ||
      position.y < 0 ||
      position.y > plateau.height
    );
  }

  result(): string {
    if (!this.hasLanded()) {
      return `${this.name} did not land.`;
    }
    return `${this.name} 🚀 x:${this.position.x} y:${this.position.y} facing ${this.orientation}.`;
  }
}
