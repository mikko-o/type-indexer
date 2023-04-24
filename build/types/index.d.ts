import { BaseContract } from "ethers";
export type AvailFilterKeys<C extends BaseContract> = keyof C['filters'];
type GetFilterFunction<C extends BaseContract, F extends keyof C['filters']> = C['filters'][F];
export type GetFilter<C extends BaseContract, F extends keyof C['filters']> = ReturnType<GetFilterFunction<C, F>>;
export {};
