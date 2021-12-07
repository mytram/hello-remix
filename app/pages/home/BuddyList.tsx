import { Buddy } from "~/models/buddy";

type Props = {
  buddies: Buddy[];
  onRemove: (buddy: Buddy) => void;
};
export default function BuddyList({ buddies, onRemove }: Props) {
  return (
    <div className="space-y-2">
      {buddies.map((buddy) => (
        <div className="flex" key={buddy.name}>
          <div className="flex-1">{buddy.name}</div>
          <button className="text-lg" onClick={() => onRemove(buddy)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}
