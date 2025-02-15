export class Hex {
  q: number
  r: number
  s: number

  constructor(q: number, r: number) {
    this.q = q
    this.r = r
    this.s = -q - r
  }

  public toString() {
    return `(${this.q}, ${this.r})`
  }
}
export default Hex
