import React, { useEffect, useState } from "react";
import Products from "./Products";
import axios from "axios";
import ErrorBanner from "../../components/ErrorBanner";
import Options from "./Options";

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

  const ItemComponent = orderType === "products" ? Products : Options;

  const dataItems =
    ItemComponent &&
    items.map((item) => (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    ));
  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격: </p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" ? "column" : "row",
        }}
      >
        {dataItems}
      </div>
    </>
  );
};

export default Type;
