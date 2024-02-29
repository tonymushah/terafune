export type CustomElementInternals = ElementInternals & {
  states?: {
    add(i: string): void
    has(i: string): boolean
    delete(i: string): void
  }
}
