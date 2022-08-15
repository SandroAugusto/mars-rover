import { Plateau } from "./Plateau";
import { Instruction, Orientation, Rover } from "./Rover";

const { L, R, M } = Instruction;

describe("rover creation", () => {
  it("should create rover given a valid input", () => {
    const name = "Mars Rover test";
    const landing = { position: { x: 1, y: 2 }, orientation: Orientation.N };
    const instructions = [L, M, L, M, L, M, L, M, M];
    const marsRover = new Rover(name, landing, instructions);

    expect(marsRover.name).toEqual(name);
    expect(marsRover.landing).toEqual(landing);
    expect(marsRover.instructions).toEqual(instructions);
    expect(marsRover.result()).toEqual(`${name} did not land.`);
  });
});

describe("rover landing", () => {
  it("should lands given a valid payload", () => {
    const plateau = new Plateau(5, 5);
    const name = "Mars Rover Test";
    const landing = { position: { x: 4, y: 1 }, orientation: Orientation.E };
    const marsRover = new Rover(name, landing, []);
    marsRover.landed(plateau);
    expect(plateau.rovers.length).toEqual(1);
    expect(marsRover.hasLanded()).toBeTruthy();
    expect(marsRover.result()).toEqual(
      `${name} 🚀 x:${landing.position.x} y:${landing.position.y} facing ${landing.orientation}.`
    );
  });
});

describe("rover navigation", () => {
  it("should navigate based on payload", () => {
    const plateau = new Plateau(4, 4);
    const name = "Mars Rover test";
    const landing = { position: { x: 1, y: 1 }, orientation: Orientation.N };
    const marsRover = new Rover(name, landing, [R, L, R, M]);
    marsRover.landed(plateau);
    const turnRightSpy = jest.spyOn(Rover.prototype, "turnRight");
    const turnLeftSpy = jest.spyOn(Rover.prototype, "turnLeft");
    const moveSpy: jest.SpyInstance = jest.spyOn(Rover.prototype, "move");
    marsRover.navigate(plateau);
    expect(turnLeftSpy).toHaveBeenCalledTimes(1);
    expect(turnRightSpy).toHaveBeenCalledTimes(2);
    expect(moveSpy).toHaveBeenCalledTimes(1);
  });
});
