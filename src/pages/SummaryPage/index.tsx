import React, { Dispatch, FormEventHandler, SetStateAction, useContext, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";

interface ICompletePage{
  setStep:Dispatch<SetStateAction<number>>;
}
const SummaryPage = ({setStep}:ICompletePage) => {
  const [orderDatas]=useContext(OrderContext);
  const [checked, setChecked] = useState(false);

  // map함수 사용을 위해 Array.from으로 유사배열의 배열화 
  const productArray=Array.from(orderDatas.products);
  const productList=productArray.map(([key,value])=>(
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions=orderDatas.options.size>0;
  let optionsRender=null;
  if(hasOptions){
    const optionsArray=Array.from(orderDatas.options.keys());
    const optionList=optionsArray.map(key=><li key={key}>{key}</li>);
    optionsRender=(
      <>
        <h2>옵션: {orderDatas.totals.options}</h2>
        <ul>{optionList}</ul>
      </>
    )
  }

  const handleSubmit:FormEventHandler<HTMLFormElement>=(event)=>{
    event.preventDefault();
    setStep(2)
  }
  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDatas.totals.products}</h2>
      <ul>{productList}</ul>
      {optionsRender}
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          id="confirm-checkbox"
        />
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
