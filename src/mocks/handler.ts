import { rest } from "msw";

// mocking할 데이터들
export const handlers = [
  rest.get("http://localhost:4000/products", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "America",
          imagePath: "/images/america.jpeg",
        },
        {
          name: "England",
          imagePath: "/images/england.jpeg",
        },
      ])
    );
  }),
  rest.get("http://localhost:4000/options", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Insurance",
        },
        {
          name: "Dinner",
        },
      ])
    );
  }),
  rest.post('http://localhost:4000/order',(req,res,ctx)=>{
    let dummyData=[
      {
        orderNumber:1,
        price:2000
      },
      {
        orderNumber:2,
        price:3000
      },
      {
        orderNumber:3,
        price:4000
      },
    ]
    return res(ctx.json(dummyData))
  })
];
