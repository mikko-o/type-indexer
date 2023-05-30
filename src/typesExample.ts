import { BaseContract } from "ethers";

import { AvailFilterKeys, GetFilter } from "."; // Import from type-indexer/build
import { TypedEvent, TypedEventFilter } from "./types/typechain/common"; // Import from generated types

type GetEventFromFilter<C extends BaseContract, F extends keyof C['filters']> = GetFilter<C, F> extends TypedEventFilter<infer _TEvent extends TypedEvent> ? _TEvent : unknown;

type GetEventArgs<C extends BaseContract, F extends keyof C['filters']> = GetEventFromFilter<C, F> extends TypedEvent<infer A extends Array<any>, infer B> ? [A, B] : never
type GetEvent<C extends BaseContract, F extends AvailFilterKeys<C>> = TypedEvent<GetEventArgs<C, F>[0], GetEventArgs<C, F>[1]>

type GetMultiEventIndexerFilterObj<C extends BaseContract> = {
  [F in keyof C['filters']]: (e: GetEvent<C, F>, contractAddress: string) => void | Promise<void>
}
export type Filters<C extends BaseContract> = { [K in keyof GetMultiEventIndexerFilterObj<C>]+?: GetMultiEventIndexerFilterObj<C>[K] }

type getEventListenerFilterObj<C extends BaseContract> = {
  [F in keyof C['filters']]: GetEvent<C, F> extends TypedEvent<infer A extends Array<any>, infer B> ? (listenerArg: [...A, TypedEvent<A & B>], contractAddress: string) => void | Promise<void> : never
}

export type getListenerFiltersType<C extends BaseContract> = { [K in keyof getEventListenerFilterObj<C>]+?: getEventListenerFilterObj<C>[K] }