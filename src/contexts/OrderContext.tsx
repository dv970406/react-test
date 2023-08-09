import { createContext, useEffect, useMemo, useState } from "react";

export type TOrderType = "products" | "options";
interface IOrderCounts {
  products: Map<any, any>;
  options: Map<any, any>;
}
interface ITotals {
  products: number;
  options: number;
  total: number;
}
interface IValue extends IOrderCounts {
  totals: ITotals;
}

export const OrderContext = createContext<
  [
    IValue,
    (itemName: string, newItemCount: number, orderType: TOrderType) => void
  ]
>([] as any);

const pricePerItem = {
  products: 1000,
  options: 500,
};

const calculateSubTotal = (
  orderType: TOrderType,
  orderCounts: IOrderCounts
) => {
  let optionCount = 0;
  orderCounts[orderType].forEach((count) => (optionCount += count));

  return optionCount * pricePerItem[orderType];
};

export const OrderContextProvider = (props: any) => {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState<ITotals>({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productsTotal = calculateSubTotal("products", orderCounts);
    const optionsTotal = calculateSubTotal("options", orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const value = useMemo(() => {
    const updateItemCount = (
      itemName: string,
      newItemCount: number,
      orderType: TOrderType
    ) => {
      const newOrderCounts = { ...orderCounts };

      const orderCountsMap = orderCounts[orderType];
      orderCountsMap.set(itemName, newItemCount);

      setOrderCounts(newOrderCounts);
    };
    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
};
