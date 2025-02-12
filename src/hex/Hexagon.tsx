import { ReactElement, useMemo } from "react"
import classNames from "classnames"
import { Hex } from "./models/Hex"
import { HexUtils } from "./HexUtils"
import { useLayoutContext } from "./Layout"

export type HexagonProps = {
  q: number
  r: number
  s: number
  className?: string
  children: ReactElement<any> | null
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
    className,
    children
  } = props

  const { layout } = useLayoutContext()
  const { pixel } = useMemo(() => {
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
        transform: `translate(${pixel.x - layout.size}px, ${pixel.y - (layout.size * Math.sqrt(3) / 2)}px)`}}>
          {children}
    </div>
  )
}

export default Hexagon
