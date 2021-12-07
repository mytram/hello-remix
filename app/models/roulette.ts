import type { Buddy } from "./buddy";

export type CoffeePair = [Buddy, Buddy];

export type RouletteGroup = {
  name: string;
  buddies: Buddy[];
};
