import React from "react";

interface IProducts {
  name: string;
  imagePath: string;
}
const Products = ({ name, imagePath }: IProducts) => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:4000/${imagePath}`}
        alt={`${name} product`}
      />
      <form>
        <label style={{ textAlign: "right" }}>{name}</label>
        <input
          style={{ marginLeft: 7 }}
          type="number"
          name="quantity"
          min={0}
          defaultValue={0}
        />
      </form>
    </div>
  );
};

export default Products;
