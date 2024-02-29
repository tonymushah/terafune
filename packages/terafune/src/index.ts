import { InvokeButtonElement, InvokeElement } from './componnents'

export function register(): void {
  customElements.define('t-invoke', InvokeElement)
  customElements.define('t-invoke-button', InvokeButtonElement, {
    extends: 'button'
  })
}

export * from './componnents'
