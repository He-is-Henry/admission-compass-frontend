import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

type Props = {
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
  correctIndex: number;
  setCorrectIndex: Dispatch<SetStateAction<number>>;
};

export default function Options({
  options,
  setOptions,
  correctIndex,
  setCorrectIndex,
}: Props) {
  const addOption = () => {
    if (options.length >= 6)
      return toast.error("6 is the maximium amount of options");
    setOptions((prev) => [...prev, ""]);
  };

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const index: number = Number(e.target.name);
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = e.target.value;
      return newOptions;
    });
  };

  const removeOption = (index: number) => {
    setOptions((prev) => {
      const newOptions = [...prev].filter((_, i) => i !== index);
      return newOptions;
    });
  };
  const aplhabets = ["A", "B", "C", "D", "E", "F"];
  return (
    <div>
      <p>Options ({options.length})</p>
      {options.map((o, i) => (
        <div key={i}>
          {aplhabets[i]}.{" "}
          <input
            onChange={onOptionChange}
            name={i.toString()}
            type="text"
            value={o}
          />
          <span
            onClick={() => removeOption(i)}
            style={{ cursor: "pointer", color: "crimson" }}
          >
            X
          </span>
        </div>
      ))}

      <select
        name="correctIndex"
        id="correctIndex"
        value={correctIndex}
        onChange={(e) => setCorrectIndex(Number(e.target.value))}
      >
        <option value="">Correct Answer</option>
        {options.map((o, i) => (
          <option key={i} value={i}>
            {aplhabets[i]}. {o.slice(0, 20)}
          </option>
        ))}
      </select>
      <button onClick={addOption}> Add Option</button>
    </div>
  );
}
