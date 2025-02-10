import * as React from "react"
import classNames from "classnames"
import { Hex } from "./models/Hex"
import { HexUtils } from "./HexUtils"
import { useLayoutContext } from "./Layout"

export type HexagonProps = {
  q: number
  r: number
  s: number
  fill?: string
  rotate: number
  className?: string
}

/**
 * Renders a Hexagon cell at the given rqs-based coordinates.
 */
export function Hexagon(
  props: HexagonProps
) {
  const {
    q,
    r,
    s,
    fill,
    rotate,
    className,
  } = props

  const { layout, points } = useLayoutContext()

  const { pixel } = React.useMemo(() => {
    const hex = new Hex(q, r, s)
    const pixel = HexUtils.hexToPixel(hex, layout)
    return {
      pixel,
    }
  }, [q, r, s, layout])
  
  return (
    <div
      className={classNames("hexagon", className)}
      style={{
        width: `${layout.size * 2}px`,
        height: `${Math.sqrt(3) * layout.size}px`,
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(${pixel.x - layout.size}px, ${pixel.y - layout.size}px)`}}>
      <svg
        style={{
          top: "-5%",
          left: "-5%",
          width: "110%",
          height: "110%",
          position: "absolute",
      }}>
        <polygon id="hexagon" points={points} transform="scale(1.1, 1.1)"/>
      </svg>
      <img
        src={`./tiles/ST_${fill}.webp`}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          transform: `rotate(${rotate}deg)`,
        }}/>
    </div>
  )
}

export default Hexagon
