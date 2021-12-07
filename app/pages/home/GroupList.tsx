import { RouletteGroup } from "~/models/roulette";

type Props = {
  groups: RouletteGroup[];
  onLoad: (group: RouletteGroup) => void;
  onRemove: (group: RouletteGroup) => void;
};

export default function GroupList({ groups, onLoad, onRemove }: Props) {
  return (
    <div className="my-8 space-y-4">
      <h2 className="text-2xl">Saved groups</h2>
      {groups.map((group) => {
        return (
          <div key={group.name} className="flex ">
            <div
              className="flex-1 cursor-pointer"
              onClick={() => onLoad(group)}
            >
              {group.name}
            </div>

            <button onClick={() => onRemove(group)}>X</button>
          </div>
        );
      })}
    </div>
  );
}
