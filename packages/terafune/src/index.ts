import { CallElement, defineComponnents } from "./componnents";

export function register (): void {
  defineComponnents([new CallElement()])
}
