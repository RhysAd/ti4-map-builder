import * as React from "react"
import { Orientation } from "./models/Orientation"
import { Point } from "./models/Point"

export type LayoutDimension = {
  size: number
  orientation: Orientation
}
export type LayoutContextProps = {
  layout: LayoutDimension
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
})

export function useLayoutContext() {
  const ctx = React.useContext(Context)
  return ctx
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
  const numTiles: number = 9;

  return (
    <Context.Provider
      value={{
        layout: {
          size: size,
          orientation: orientation
        },
      }}
    >
      <div className={className} style={{position: "relative", minWidth: `${size * 2.0 + (size * (numTiles - 1) * 3.0 / 2.0)}px`, height: `${Math.sqrt(3) * size * numTiles}px`}}>
        {children}
      </div>
    </Context.Provider>
  )
}

export default Layout
