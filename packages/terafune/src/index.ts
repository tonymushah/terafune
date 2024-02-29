import { InvokeRefreshButtonElement, InvokeElement } from './componnents'

export function register(): void {
  customElements.define('t-invoke', InvokeElement)
  customElements.define('t-invoke-refresh', InvokeRefreshButtonElement, {
    extends: 'button'
  })
}

export * from './componnents'
