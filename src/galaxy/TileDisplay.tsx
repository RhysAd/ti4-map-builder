import "./TileDisplay.scss"

export type TileDisplayProps = {
    tileId: string
    rotation: number
  }

// const y = Math.sqrt(3) / 2;
// const corners: Point[] = [
//   new Point(2 , y),
//   new Point(1.5, 0),
//   new Point(1 / 2, 0),
//   new Point(0, y),
//   new Point(1 / 2, 2 * y),
//   new Point(1.5, y * 2)
// ];
// const points = corners.map((point) => `${point.x},${point.y}`).join(" ");

// regular flat top hexagon with origin (0, 0) and size (2, sqrt(3))
const points = "2,0.8660254037844386 1.5,0 0.5,0 0,0.8660254037844386 0.5,1.7320508075688772 1.5,1.7320508075688772";
  
export function TileDisplay(props: TileDisplayProps) {
    const {
      tileId,
      rotation,
    } = props;

  return (
    <div className="tile">
      <svg
        className="outline"
        viewBox={`0 0 2 ${Math.sqrt(3)}`}>
        <polygon id="hexagon" points={points}/>
      </svg>
      <img
        src={`./tiles/ST_${tileId}.webp`}
        alt=""
        style={{
          width: "100%",
          transform: `rotate(${rotation}deg)`,
          display: "block"
        }}/>
    </div>
  )
}