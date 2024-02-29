import { invoke } from '@tauri-apps/api'
import { InvokeArgs } from '@tauri-apps/api/tauri'
import isJson from '../utils/isJson'
import mapKeyStrArrayToObject from '../utils/mapStrArrayToObject'

export default class InvokeElement extends HTMLElement {
  private _internals: ElementInternals
  constructor() {
    super()
    this._internals = this.attachInternals()
    this.pedding = true
  }
  set pedding(i: boolean) {
    if (i) {
      this._internals.states.add('pedding')
    } else {
      this._internals.states.delete('pedding')
    }
  }
  get pedding(): boolean {
    return this._internals.states.has('pedding')
  }
  set loading(i: boolean) {
    if (i) {
      this._internals.states.add('loading')
    } else {
      this._internals.states.delete('loading')
    }
  }
  get loading(): boolean {
    return this._internals.states.has('loading')
  }
  set success(i: boolean) {
    if (i) {
      this._internals.states.add('success')
    } else {
      this._internals.states.delete('success')
    }
  }
  get success(): boolean {
    return this._internals.states.has('success')
  }
  set error(i: boolean) {
    if (i) {
      this._internals.states.add('error')
    } else {
      this._internals.states.delete('error')
    }
  }
  get error(): boolean {
    return this._internals.states.has('error')
  }
  _get_args_from_attr(): InvokeArgs {
    const args_names = this.getAttributeNames().filter(a =>
      a.startsWith('arg:')
    )
    //console.log(args_names);
    const arg_map = new Map<string[], string>()
    args_names.forEach(e => {
      const v = this.getAttribute(e)
      if (v) {
        arg_map.set(e.replace('arg:', '').split(':'), v)
      }
    })
    return mapKeyStrArrayToObject(arg_map)
  }
  get_args_from_attr(): InvokeArgs {
    const _arg = this.getAttribute('arg')
    if (_arg != null && _arg.trim().length != 0 && isJson(_arg)) {
      return JSON.parse(_arg)
    } else {
      return this._get_args_from_attr()
    }
  }
  private internal_invoke(command: string) {
    if (command.trim().length == 0) {
      throw new Error('The command name is invalid')
    }
    const args = this.get_args_from_attr()
    this.pedding = false
    this.loading = true
    invoke<string>(command, args)
      .then(e => {
        this.success = true
        this.error = false
        this.innerHTML = e
      })
      .catch(e => {
        this.success = false
        this.error = true
        const show_error = this.getAttribute('show-error')
        if (show_error != null) {
          this.innerHTML = e
        } else {
          console.error(e)
        }
      })
      .finally(() => {
        this.pedding = true
        this.loading = false
      })
  }
  public invoke_command() {
    const command = this.getAttribute('command')

    if (command) {
      this.internal_invoke(command)
    } else {
      throw new Error('The command name is required')
    }
  }
  connectedCallback() {
    if (this.getAttribute('disabled') == null) {
      this.invoke_command()
    }
  }

  disconnectedCallback() {}

  adoptedCallback() {}

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name == 'command') {
      this.internal_invoke(newValue)
    } else if (name.startsWith('arg')) {
      this.invoke_command()
    }
  }
}
