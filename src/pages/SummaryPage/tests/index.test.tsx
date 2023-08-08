import { render, screen } from "@testing-library/react";
import SummaryPage from "..";

test("checkbox and button", () => {
  render(<SummaryPage />);

  // label과 checkbox가 id로 연결되어 있어야 함
  const checkbox = screen.getByRole("checkbox", {
    name: "주문하려는 것을 확인하셨나요?",
  }) as HTMLInputElement;

  expect(checkbox.checked).toEqual(false);

  const confirmButton = screen.getByRole("button", {
    name: "주문 확인",
  }) as HTMLButtonElement;

  // checkbox가 false일 때, confirmButton이 disabled이 true여야 한다.
  expect(confirmButton.disabled).toBeTruthy();
});
