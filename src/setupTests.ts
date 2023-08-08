// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// 모든 테스트 이전에 서버를 시작
beforeAll(() => server.listen());

// 각 테스트가 끝날 때마다 handlers 초기화
afterEach(() => server.resetHandlers());

// 모든 테스트 이후에 서버 종료
afterAll(() => server.close());
