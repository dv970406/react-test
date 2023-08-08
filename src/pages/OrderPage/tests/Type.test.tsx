import { render, screen } from "@testing-library/react";
import Type from "../Type";

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
