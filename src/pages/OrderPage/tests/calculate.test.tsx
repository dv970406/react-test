import Type from "../Type";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test.utils";

test("update product's total when products change", async () => {
  render(<Type orderType="products" />);

  // exact를 false로 줌으로써 "상품 총 가격:" 이라는 텍스트만 포함되면 뒤에 0이 오건, 4000이 오건 상관없이 잡아옴
  const productsTotal = screen.getByText("상품 총 가격:", { exact: false });
  expect(productsTotal).toHaveTextContent("0");

  // 아메리카 여행 상품 1개 추가
  // 서버에서 여행 정보를 가지고 온 다음에 생겨나는 버튼이기에 find쿼리 사용
  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, "1");
  expect(productsTotal).toHaveTextContent("1000");
});

test("update option's total when options change", async () => {
  render(<Type orderType="options" />);

  // 옵션 총 가격이 0부터 시작
  const optionsTotal = screen.getByText("옵션 총 가격:", { exact: false });
  expect(optionsTotal).toHaveTextContent("0");

  // 보험 옵션 추가
  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent("500");

  // 디너 옵션 추가
  const dinnerCheckbox = await screen.findByRole("checkbox", {
    name: "Dinner",
  });
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("1000");

  // 디너 옵션 제거
  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("500");
});
