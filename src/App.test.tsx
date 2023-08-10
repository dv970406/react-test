import { render, screen } from "@testing-library/react"
import App from "./App"
import userEvent from "@testing-library/user-event";

test('From order to order completion',async()=>{
    ////////// 주문 페이지 //////////
    // 주문 페이지에서 주문하고 주문 버튼 클릭
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


    ////////// 주문 확인 페이지 //////////
    // 제목
    const summaryHeading=screen.getByRole('heading',{
        name:'주문 확인'
    });
    expect(summaryHeading).toBeInTheDocument();

    // 여행 상품 총 가격
    // From order to order completion 테스트에서 America 2개, England 3개를 선택했으므로 5000원
    const productsHeading=screen.getByRole('heading',{
        name:'여행 상품: 5000'
    });
    expect(productsHeading).toBeInTheDocument();

    // 옵션 총 가격
    const optionsHeading=screen.getByRole('heading',{
        name:'옵션: 500'
    });
    expect(optionsHeading).toBeInTheDocument();

    // 주문한 product, option 나열
    expect(screen.getByText('2 America')).toBeInTheDocument()
    expect(screen.getByText('3 England')).toBeInTheDocument()
    expect(screen.getByText('Insurance')).toBeInTheDocument()

    // 체크박스 체크
    const confirmCheckbox=screen.getByRole('checkbox',{
        name:'주문하려는 것을 확인하셨나요?'
    });
    userEvent.click(confirmCheckbox);

    const confirmOrderButton=screen.getByRole('button',{
        name:'주문 확인'
    });
    userEvent.click(confirmOrderButton);
})



