import React, { Dispatch, SetStateAction, useContext } from "react";
import Type from "./Type";
import { OrderContext } from "../../contexts/OrderContext";

interface IOrderPage{
  setStep:Dispatch<SetStateAction<number>>;
}
const OrderPage = ({setStep}:IOrderPage) => {
  const [orderDatas] = useContext(OrderContext);
  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType="products" />
      </div>
      <div style={{ display: "flex", marginTop: 20 }}>
        <div style={{ width: "50%" }}>
          <Type orderType="options" />
        </div>
        <div style={{ width: "50%" }}>
          <h2>Total Price: {orderDatas.totals.total}</h2>
          <br />
          <button onClick={()=>setStep(1)}>주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
