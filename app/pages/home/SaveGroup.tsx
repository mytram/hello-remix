import { useState } from "react";
import { Form } from "remix";
import Button from "~/widgets/Button";

type Props = {
  onSave: (name: string) => void;
};

export default function SaveGroup({ onSave }: Props) {
  const [name, setName] = useState<string>("");

  return (
    <Form
      className="flex flex-col md:flex-row w-3/4 md:w-full md:space-x-3 space-y-3 md:space-y-0 justify-center"
      onSubmit={() => {
        if (name !== "") {
          onSave(name);
          setName("");
        }
      }}
    >
      <input
        type="text"
        className="flex-1 rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Give a name to save the roulette"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <Button type="submit">Save</Button>
    </Form>
  );
}
