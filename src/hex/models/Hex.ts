export class Hex {
  public q: number
  public r: number
  public s: number

  constructor(q: number, r: number) {
    this.q = q
    this.r = r
    this.s = -q - r
  }

  public toString(): string {
    return `${this.q}, ${this.r}`
  }

  public equals(obj: Hex): boolean {
    return this.q === obj.q && this.r === obj.r && this.s === obj.s
  }
}
export default Hex
