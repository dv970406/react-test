import React from "react";

interface IOptions {
  name: string;
  updateItemCount: (itemName: string, newItemCount: number) => void;
}
const Options = ({ name, updateItemCount }: IOptions) => {
  return (
    <form>
      <input
        type="checkbox"
        id={`${name} option`}
        onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0)}
      />{" "}
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
};

export default Options;
