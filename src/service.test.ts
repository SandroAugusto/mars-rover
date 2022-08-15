import { Orientation } from "./Rover";
import { ValidatePlateau, CreateRoversData } from "./service";

describe("Plateu data", () => {
  it("should return plateau correctly", () => {
    const data = [5, 5];

    const actualPlateau = ValidatePlateau(data);

    expect(actualPlateau.width).toEqual(5);
    expect(actualPlateau.height).toEqual(5);
    expect(actualPlateau.rovers).toEqual([]);
  });

  it("should throw error from input not for plateau", () => {
    const data = [5];

    try {
      ValidatePlateau(data);
    } catch (error) {
      expect(error.message).toEqual(
        "Invalid Plateau dimensions. It should be a matrix of numbers"
      );
    }
  });

  it("should throw error from invalid plateau dimensions", () => {
    const data = [0, 0];

    try {
      ValidatePlateau(data);
    } catch (error) {
      expect(error.message).toEqual(
        "Plateau infos should be numbers and grader than zero"
      );
    }
  });
});

describe("create rovers", () => {
  it("should return rovers correctly", () => {
    const data = [
      "Rover1 Landing:1 2 N",
      "Rover1 Instructions:LMLMLMLMM",
      "Rover2 Landing:3 3 E",
      "Rover2 Instructions:MRRMMRMRRM",
    ];

    const rovers = CreateRoversData(data);
    const [rover1, rover2] = rovers;

    expect(rovers.length).toEqual(2);
    expect(rover1.name).toEqual("Rover1");
    expect(rover1.landing).toEqual({
      position: { x: 1, y: 2 },
      orientation: Orientation.N,
    });
    expect(rover1.instructions).toEqual("LMLMLMLMM".split(""));

    expect(rover2.name).toEqual("Rover2");
    expect(rover2.landing).toEqual({
      position: { x: 3, y: 3 },
      orientation: Orientation.E,
    });
    expect(rover2.instructions).toEqual("MRRMMRMRRM".split(""));
  });
});
