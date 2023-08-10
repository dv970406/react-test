import { render, screen } from "@testing-library/react"
import App from "./App"
import userEvent from "@testing-library/user-event";

test('From order to order completion',async()=>{
    // 이 테스트에서의 render는 custom render가 아닌 RTL 라이브러리의 render 사용
    // App 컴포넌트는 이미 내부에 OrderContextProvider가 감싸져있으니 custom render의 wrapper의 도움이 필요가 없음
    render(<App />);

    const americaInput=await screen.findByRole('spinbutton',{
        name:"America"
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput,'2');

    const englandInput=await screen.findByRole('spinbutton',{
        name:"England"
    });
    userEvent.clear(englandInput);
    userEvent.type(englandInput,'3');

    const insuranceCheckbox=await screen.findByRole('checkbox',{
        name:'Insurance'
    });
    userEvent.click(insuranceCheckbox);

    const orderButton=screen.getByRole('button',{
        name:'주문하기'
    });
    userEvent.click(orderButton);
})