import React, { useEffect, useState } from "react";
import Products from "./Products";
import axios from "axios";
import ErrorBanner from "../../components/ErrorBanner";

interface IType {
  orderType: string;
}
interface IItem {
  name: string;
  imagePath: string;
}
const Type = ({ orderType }: IType) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType: string) => {
    try {
      let response = await axios.get(`http://localhost:4000/${orderType}`);
      setItems(response?.data);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

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
