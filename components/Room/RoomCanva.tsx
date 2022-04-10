import { Stage, Layer, Circle, Image, Rect } from "react-konva";
import { Room } from "../../lib/types";
import PhotoFrame, { Frame } from "../PhotoFrame";

export type RoomCanvaProps = {
  room: Room
}

function RoomCanva({ room }: RoomCanvaProps) {

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect width={window.innerWidth} height={window.innerHeight} listening={false} 
          fillLinearGradientStartPoint={{x: 0, y: 0}}
          fillLinearGradientEndPoint={{x: 0, y: window.innerHeight}}
          fillLinearGradientColorStops={[
            0,
            '#06b6d4',
            1,
            'rgba(0, 0, 0, 0)',
          ]} />
      </Layer>
      <Layer>
        <PhotoFrame imgSrc={"/nfts/cat.jpeg"} width={200} height={200} x={100} y={200} frame={Frame.Frame1} />
        <PhotoFrame imgSrc={"/nfts/monkey.jpeg"} width={200} height={300} x={320} y={200} frame={Frame.Frame2} />
      </Layer>
    </Stage>
  );
}

export default RoomCanva;