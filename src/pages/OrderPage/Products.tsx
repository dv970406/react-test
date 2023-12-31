import React, { ChangeEventHandler } from "react";

interface IProducts {
  name: string;
  imagePath: string;
  updateItemCount: (itemName: string, newItemCount: number) => void;
}
const Products = ({ name, imagePath, updateItemCount }: IProducts) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const currentValue = +event.target.value;
    updateItemCount(name, currentValue);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:4000/${imagePath}`}
        alt={`${name} product`}
      />
      <form>
        <label htmlFor={name} style={{ textAlign: "right" }}>
          {name}
        </label>
        <input
          id={name}
          style={{ marginLeft: 7 }}
          type="number"
          name="quantity"
          min={0}
          defaultValue={0}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Products;
