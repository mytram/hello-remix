import type { MetaFunction } from "remix";
import Home from "~/pages/Home";

export let meta: MetaFunction = () => {
  return {
    title: "Coffee roulette",
    description: "Welcome to coffee roulette!",
  };
};

export default function Index() {
  return <Home />;
}
