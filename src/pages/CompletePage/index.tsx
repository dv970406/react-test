import React, { Dispatch, SetStateAction } from "react";

interface ICompletePage{
  setStep:Dispatch<SetStateAction<number>>;
}
const CompletePage = ({setStep}:ICompletePage) => {
  return <div>CompletePage</div>;
};

export default CompletePage;
