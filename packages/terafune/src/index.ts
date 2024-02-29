import { InvokeElement } from "./componnents";

export function register (): void {
  customElements.define("t-invoke", InvokeElement);
}

export * from "./componnents";