import React from "react";
import { RenderOptions, render } from "@testing-library/react";
import { OrderContextProvider } from "./contexts/OrderContext";

// const AllTheProviders = ({ children }) => {
//   return (
//     <ThemeProvider theme="light">
//       <TranslationProvider messages={defaultStrings}>
//         {children}
//       </TranslationProvider>
//     </ThemeProvider>
//   );
// };

const customRender = (ui: any, options?: RenderOptions) =>
  render(ui, { wrapper: OrderContextProvider, ...options });

// re-export everything - screen같은 RTL의 기능들을 모두 이 파일에서 export하는 것으로 수정
export * from "@testing-library/react";

// override render method - 기존의 render 메소드를 덮어쓴다.
export { customRender as render };
