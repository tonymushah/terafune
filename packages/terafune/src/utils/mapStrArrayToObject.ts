import isJson from './isJson'

export default function mapKeyStrArrayToObject(
  map: Map<string[], string>
): Record<string, unknown> {
  let obj: Record<string, unknown> = {}
  map.forEach((value, a) => {
    if (a.length == 1 && isJson(value)) {
      obj[a[0]] = JSON.parse(value)
    } else {
      let current_o: Record<string, unknown> = {}
      a.forEach((v, i) => {
        if (i == 0) {
          current_o[v] = value
        } else {
          let c = structuredClone(current_o)
          current_o = {}
          current_o[v] = c
        }
      })
      Object.assign(obj, current_o)
    }
  })
  return obj
}
