import { setupServer } from "msw/node";
import { handlers } from "./handler";

// mocking server 생성
export const server = setupServer(...handlers);
