import Type from "../Type";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test.utils";
import OrderPage from "..";

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

describe("total price of products and options", () => {
  // total price가 0부터 시작해서 product를 추가했을 때 total price가 제대로 변화되는가
  test("total price starts with 0 and updating total price when adding one product", async () => {
    render(<OrderPage />);

    const total = screen.getByText("Total Price:", { exact: false });
    expect(total).toHaveTextContent("0");

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");

    expect(total).toHaveTextContent("1000");
  });

  // option 추가 시 total price가 업데이트 되는가
  test("updating total price when adding one option", async () => {
    render(<OrderPage />);
    const total = screen.getByText("Total Price:", { exact: false });

    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent("500");
  });

  // option와 product 제거 시 total price가 업데이트 되는가
  test("updating total price when removing option and product", async () => {
    render(<OrderPage />);
    const total = screen.getByText("Total Price:", { exact: false });

    // insurance : 500원
    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "Insurance",
    });
    userEvent.click(insuranceCheckbox);

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });

    // america product 3개: 3000 + insurance: 500 = 3500
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "3");

    // america product를 다시 1개로 수정하면?
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");

    // america product 1개: 1000 + insurance: 500 = 1500
    expect(total).toHaveTextContent("1500");
  });
});
