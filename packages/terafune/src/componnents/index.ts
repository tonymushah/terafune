export interface DefineCustomComponnents {
    define(): void
}

export function defineComponnents(comps: DefineCustomComponnents[]){
    comps.forEach((c) => {
        c.define();
    })
}

export { default as CallElement } from "./call"; 