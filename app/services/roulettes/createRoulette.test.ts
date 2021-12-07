import { Buddy } from "~/models/buddy";
import { createRoulette, scheduleConfigs } from "./createRoulette";

describe("createRoulette", () => {
  it("schedules an odd number of buddies", () => {
    const buddies: Buddy[] = [
      { name: "buddy 1" },
      { name: "buddy 2" },
      { name: "buddy 3" },
    ];

    const actual = createRoulette(buddies);

    expect(actual.length).toBe(3);
  });
});

describe("generatePairing", () => {
  it("cannot schedule configuration for odd numbers", () => {
    const actual = scheduleConfigs(7);
    expect(actual).toBeUndefined();
  });

  it("schedules configuration for 8 people", () => {
    const want = [
      [
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
      ],
      [
        [0, 2],
        [1, 3],
        [4, 6],
        [5, 7],
      ],
      [
        [0, 3],
        [1, 2],
        [4, 7],
        [5, 6],
      ],
      [
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ],
      [
        [0, 5],
        [1, 4],
        [2, 7],
        [3, 6],
      ],
      [
        [0, 6],
        [1, 7],
        [2, 4],
        [3, 5],
      ],
      [
        [0, 7],
        [1, 6],
        [2, 5],
        [3, 4],
      ],
    ];

    const actual = scheduleConfigs(8);
    expect(actual?.length).toEqual(7);
    expect(actual).toEqual(want);
  });
});
