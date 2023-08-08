import React, { useEffect, useState } from "react";
import Products from "./Products";
import axios from "axios";

interface IType {
  orderType: string;
}
interface IItem {
  name: string;
  imagePath: string;
}
const Type = ({ orderType }: IType) => {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType: string) => {
    let response = await axios.get(`http://localhost:4000/${orderType}`);
    setItems(response?.data);
  };

  const ItemComponent = orderType === "products" ? Products : null;

  const optionItems =
    ItemComponent &&
    items.map((item) => (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    ));
  return <div>{optionItems}</div>;
};

export default Type;
