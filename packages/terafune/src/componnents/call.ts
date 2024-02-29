import { DefineCustomComponnents } from ".";

export default class CallElement extends HTMLElement implements DefineCustomComponnents {
  constructor() {
    super()
  }
  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log(`Attribute ${name} has changed.`);
  }
  define(): void {
      customElements.define("call", CallElement);
  }
}

