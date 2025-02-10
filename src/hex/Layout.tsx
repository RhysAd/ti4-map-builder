import * as React from "react"
import { Orientation } from "./models/Orientation"
import { Point } from "./models/Point"

export type LayoutDimension = {
  size: number
  orientation: Orientation
}
export type LayoutContextProps = {
  layout: LayoutDimension
  points: string
}

const LAYOUT_FLAT = new Orientation(
  3.0 / 2.0,
  0.0,
  Math.sqrt(3.0) / 2.0,
  Math.sqrt(3.0),
  2.0 / 3.0,
  0.0,
  -1.0 / 3.0,
  Math.sqrt(3.0) / 3.0,
  0.0,
)
const LAYOUT_POINTY = new Orientation(
  Math.sqrt(3.0),
  Math.sqrt(3.0) / 2.0,
  0.0,
  3.0 / 2.0,
  Math.sqrt(3.0) / 3.0,
  -1.0 / 3.0,
  0.0,
  2.0 / 3.0,
  0.5,
)
const defaultSize = 10

const Context = React.createContext<LayoutContextProps>({
  layout: {
    size: defaultSize,
    orientation: LAYOUT_FLAT,
  },
  points: "",
})

export function useLayoutContext() {
  const ctx = React.useContext(Context)
  return ctx
}

/**
 * Calculates the points for a hexagon given the size, angle, and center
 * @param circumradius Radius of the Hexagon
 * @param angle Angle offset for the hexagon in radians
 * @param center Central point for the heaxagon
 * @returns Array of 6 points
 */

function calculateCoordinates(
  size: number,
  angle: number = 0,
  center: Point = new Point(0, 0),
) {
  const y = Math.sqrt(3) / 2 * size
  const corners: Point[] = [
    new Point(2 * size, y),
    new Point(size * 1.5, 0),
    new Point(size / 2, 0),
    new Point(0, y),
    new Point(size / 2, 2 * y),
    new Point(size * 1.5, y * 2)
  ]

  return corners
}

export type LayoutProps = {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | JSX.Element
    | JSX.Element[]
  className?: string
  flat?: boolean
  size?: number
}

/**
 * Provides LayoutContext for all descendands and renders child elements inside a <g> (Group) element
 */
export function Layout({
  children,
  className,
  size = defaultSize,
  flat = true,
}: LayoutProps) {
  const orientation = flat ? LAYOUT_FLAT : LAYOUT_POINTY
  const angle = flat ? 0 : Math.PI / 6
  const cornerCoords = calculateCoordinates(size, angle)
  const points = cornerCoords.map((point) => `${point.x},${point.y}`).join(" ")

  return (
    <Context.Provider
      value={{
        layout: {
          size: size,
          orientation: orientation
        },
        points,
      }}
    >
      <div className={className} style={{position: "relative", width: "100%", height: "100%"}}>
        {children}
      </div>
    </Context.Provider>
  )
}

export default Layout
