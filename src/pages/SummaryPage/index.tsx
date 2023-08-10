import React, { Dispatch, SetStateAction, useState } from "react";

interface ICompletePage{
  setStep:Dispatch<SetStateAction<number>>;
}
const SummaryPage = ({setStep}:ICompletePage) => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <form>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          id="confirm-checkbox"
        />
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button onClick={()=>setStep(2)} disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
