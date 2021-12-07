import { useEffect, useState } from "react";
import { Buddy } from "~/models/buddy";
import { CoffeePair, RouletteGroup } from "~/models/roulette";
import { createRoulette } from "~/services/roulettes/createRoulette";
import Button from "~/widgets/Button";
import AddBuddy from "./home/AddBuddy";
import BuddyList from "./home/BuddyList";
import GroupList from "./home/GroupList";
import SaveGroup from "./home/SaveGroup";

export default function Home() {
  const [buddies, setBuddies] = useState<Buddy[]>([]);
  const [groups, setGroups] = useState<RouletteGroup[]>();
  const [roulette, setRoulette] = useState<CoffeePair[][]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("SAVED-GROUPS");
    if (saved) {
      setGroups(JSON.parse(saved) as RouletteGroup[]);
    }
  }, []);

  useEffect(() => {
    if (groups) {
      localStorage.setItem("SAVED-GROUPS", JSON.stringify(groups));
    }
  }, [groups]);

  return (
    <div className="remix__page">
      <main className="space-y-4">
        <h2 className="text-2xl">Welcome to office coffee roulette!</h2>
        <p>We're stoked that you're here. 🥳</p>
        <p></p>
        <p></p>

        {groups && groups.length > 0 && (
          <GroupList
            groups={groups}
            onLoad={(g) => setBuddies(g.buddies)}
            onRemove={(g) =>
              setGroups(groups.filter((group) => g.name !== group.name))
            }
          />
        )}

        <div className="space-y-8 my-8">
          <h3 className="text-xl">Coffee buddies</h3>

          <AddBuddy onAdd={(buddy) => setBuddies([...buddies, buddy])} />

          <BuddyList
            buddies={buddies}
            onRemove={(buddy) =>
              setBuddies(buddies.filter((x) => x.name !== buddy.name))
            }
          />

          {buddies.length > 0 && (
            <SaveGroup
              onSave={(name) => {
                setGroups([...(groups || []), { name, buddies }]);
              }}
            />
          )}
        </div>

        <div className="space-x-4">
          <Button
            type="button"
            disabled={buddies.length === 0}
            onClick={() => setRoulette(createRoulette(buddies))}
          >
            Create roulette
          </Button>
        </div>
      </main>

      <aside className="space-y-4">
        <h3 className="text-2xl">Roulette</h3>

        {roulette.map((pairs, index) => {
          const week = `Week ${index + 1}`;
          return (
            <div key={week}>
              <h4 className="text-lg">{week}</h4>
              {pairs.map(([a, b], i) => {
                return (
                  <div key={`${week}-${i}`}>
                    <span>{a.name}</span> - <span>{b.name}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </aside>
    </div>
  );
}
