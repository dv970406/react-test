import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { IOrder, OrderContext, TOrderContext } from "../../contexts/OrderContext";
import axios from "axios";
import ErrorBanner from "../../components/ErrorBanner";

interface ICompletePage{
  setStep:Dispatch<SetStateAction<number>>;
}

interface IOrderHistory{
  orderNumber:number;
  price:number;
}
const CompletePage = ({setStep}:ICompletePage) => {
  const [orderHistory,setOrderHistory]=useState<IOrderHistory[]>([]);
  const [error,setError]=useState(false)
  const [loading,setLoading]=useState(false)
  const [orderDatas]=useContext(OrderContext);

  useEffect(()=>{
    orderCompleted(orderDatas)
  },[orderDatas])

  const orderTable=orderHistory.map(item=>(
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ))
  const orderCompleted=async(orderDatas:IOrder)=>{
    try {
      setLoading(true)
      let response=await axios.post(
        `http://localhost:4000/order`,
        orderDatas
      )
      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {
      setError(true)
    }
  }
  if(error){
    return <ErrorBanner message="에러가 발생했습니다."/>
  }

  if(loading){
    return <div>loading...</div>
  } else{
    return <div style={{textAlign:'center'}}>
      <h2>주문이 성공했습니다.</h2>
      <h3>지금까지 모든 주문</h3>
      <table>
        <tbody>
          <tr>
            <th>number</th>
            <th>price</th>
          </tr>
          {orderTable}
        </tbody>
      </table>
      <button onClick={()=>setStep(0)}>
        되돌아가기
      </button>
    </div>;

  }
};

export default CompletePage;
