import { CallElement } from "./componnents";

export function register (): void {
  customElements.define("t-invoke", CallElement);
}

export * from "./componnents";