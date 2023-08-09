import React, { useContext, useEffect, useState } from "react";
import Products from "./Products";
import axios from "axios";
import ErrorBanner from "../../components/ErrorBanner";
import Options from "./Options";
import { OrderContext, TOrderType } from "../../contexts/OrderContext";

interface IType {
  orderType: TOrderType;
}
interface IItem {
  name: string;
  imagePath: string;
}
const Type = ({ orderType }: IType) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [error, setError] = useState(false);
  const [orderDatas, updateItemCount] = useContext(OrderContext);

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
        updateItemCount={(itemName: string, newItemCount: number) =>
          updateItemCount(itemName, newItemCount, orderType)
        }
      />
    ));

  let orderTypeKorean = orderType === "products" ? "상품" : "옵션";
  return (
    <>
      <h2>상품 종류</h2>
      <p>상품 하나의 가격</p>
      <p>
        {orderTypeKorean} 총 가격: {orderDatas.totals[orderType]}
      </p>
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
