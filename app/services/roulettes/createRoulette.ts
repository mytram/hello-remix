import { Buddy } from "~/models/buddy";

type Pair = [number, number];
type Seen = Record<number, boolean>;

type Props = {
  elements: number[];
  seen: Seen;
};

const pickConfig = ({ elements, seen }: Props): Pair[] => {
  let config: Pair[] = [];
  if (elements.length < 2) {
    return config;
  }

  if (elements.length === 2) {
    const index = elements[0] * 10 + elements[1];
    if (seen[index]) {
      return config;
    } else {
      seen[index] = true;
      return [[elements[0], elements[1]]];
    }
  }

  const head = elements[0];
  const tail = elements.slice(1);

  for (let i = 0; i < tail.length; i++) {
    const e = tail[i];
    const index = head * 10 + e;

    if (!seen[index]) {
      const subconfig = pickConfig({
        elements: tail.filter((x) => x !== e),
        seen,
      });
      if (subconfig.length !== 0) {
        seen[index] = true;
        return [[head, e], ...subconfig];
      }
    }
  }

  return [];
};

export const scheduleConfigs = (size: number): Pair[][] | undefined => {
  if (size % 2 !== 0) {
    return;
  }

  let seen: Seen = {};
  let configs: Pair[][] = [];

  let elements: number[] = [];
  for (let i = 0; i < size; i++) {
    elements = [...elements, i];
  }

  while (configs.length < size - 1) {
    const config = pickConfig({ elements, seen });
    configs = [...configs, config];
  }

  return configs;
};

export const createRoulette = (buddies: Buddy[]): CoffeePair[][] => {
  if (buddies.length % 2 !== 0) {
    buddies = [...buddies, { name: "Week off", email: "weekoff" }];
  }

  const configs = scheduleConfigs(buddies.length);

  if (!configs) {
    return [];
  }

  let roulette: CoffeePair[][] = [];

  configs.forEach((config) => {
    let pairs: CoffeePair[] = [];

    config.forEach(([a, b]) => (pairs = [...pairs, [buddies[a], buddies[b]]]));

    roulette = [...roulette, pairs];
  });

  return roulette;
};
