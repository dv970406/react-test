import { render, screen } from "@testing-library/react";
import Type from "../Type";
import { server } from "../../../mocks/server";
import { rest } from "msw";

// Products
test("display product images from server", async () => {
  render(<Type orderType="products" />);

  // image에 alt가 product라는 이름이 포함되어 있다면 전부 포함시키는 정규표현식 사용
  // Products 컴포넌트의 images들은 서버로부터 받아오는 데이터라 비동기로 처리할 것임(find쿼리 사용)
  const productImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /product$/i,
  });
  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt);

  expect(altText).toEqual(["America product", "England product"]);
});

test("when fetching product datas, face an error", async () => {
  // handler파일에 정의해놓은 handler로 보내지 않고 에러를 내기 위해 handler를 덮어씌운 것
  server.resetHandlers(
    rest.get("http://localhost:4000/products", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<Type orderType="products" />);

  const errorBanner = await screen.findByTestId("error-banner");
  expect(errorBanner).toHaveTextContent("에러가 발생했습니다.");
});

// Options
test("fetch option information from server", async () => {
  render(<Type orderType="options" />);

  // Options 컴포넌트의 images들은 서버로부터 받아오는 데이터라 비동기로 처리할 것임(find쿼리 사용)
  const optionCheckboxes: HTMLInputElement[] = await screen.findAllByRole(
    "checkbox"
  );
  expect(optionCheckboxes).toHaveLength(2);
});
