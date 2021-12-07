import { useState } from "react";
import { Form } from "remix";
import { Buddy } from "~/models/buddy";
import Button from "~/widgets/Button";

type Props = {
  onAdd: (buddy: Buddy) => void;
};

export default function AddBuddy({ onAdd }: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <Form
      className="flex flex-col md:flex-row w-3/4 md:w-full md:space-x-3 space-y-3 md:space-y-0 justify-center"
      onSubmit={() => {
        if (name !== "") {
          onAdd({ name, email });
          setName("");
          setEmail("");
        }
      }}
    >
      <input
        type="text"
        className="flex-1 rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Coffee buddy's name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <Button type="submit">Add</Button>
    </Form>
  );
}
