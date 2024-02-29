import InvokeElement from './t-invoke'
export default class InvokeRefreshButtonElement extends HTMLElement {
  constructor() {
    super()
  }
  get_target_id(): string | null {
    return this.getAttribute('target-id')
  }
  get_target_command(): string | null {
    return this.getAttribute('command')
  }
  get_target_class(): string | null {
    return this.getAttribute('target-class')
  }
  is_closet(): boolean {
    return this.getAttribute('closet') != null
  }
  get_selector(): string | null {
    const command = this.get_target_command()
    const class_ = this.get_target_class()
    if (command != null && class_ != null) {
      return `t-invoke.${class_}[command='${command}']`
    } else if (command != null) {
      return `t-invoke[command='${command}']`
    } else if (class_ != null) {
      return `t-invoke.${class_}`
    } else {
      return null
    }
  }
  private get_targets_by_selector(selector: string): InvokeElement[] {
    let elements: InvokeElement[] = []
    document.querySelectorAll(selector).forEach(e => {
      if (e instanceof InvokeElement) {
        elements.push(e)
      }
    })
    return elements
  }
  get_targets(): InvokeElement[] {
    let targets: InvokeElement[] = []
    const target_id = this.get_target_id()
    if (
      target_id != null &&
      target_id.trim().length != 0 &&
      document.getElementById(target_id) != null
    ) {
      const el = document.getElementById(target_id)!
      if (el instanceof InvokeElement) {
        targets.push(el)
      }
    } else {
      const selector = this.get_selector()
      //console.debug(selector)
      if (selector) {
        this.get_targets_by_selector(selector).forEach(e => {
          if (e instanceof InvokeElement) {
            targets.push(e)
          }
        })
      } else {
        throw new Error(
          'Please define a `target-id` or a `target-class` or a  `command` attribute'
        )
      }
    }
    return targets
  }
  invoke_targets(targets: InvokeElement[]) {
    if (targets.length == 0) {
      console.warn('No targets have been triggered')
    } else {
      targets.forEach(t => {
        t.invoke_command()
      })
    }
  }
  invoke() {
    const targets = this.get_targets()
    this.invoke_targets(targets)
  }
  connectedCallback() {
    this.removeEventListener('click', this.invoke)
    this.addEventListener('click', this.invoke)
  }

  disconnectedCallback() {
    console.log('Custom element removed from page.')
  }

  adoptedCallback() {
    this.removeEventListener('click', this.invoke)
    this.addEventListener('click', this.invoke)
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.removeEventListener('click', this.invoke)
    this.addEventListener('click', this.invoke)
  }
}
