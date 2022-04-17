import { Stage, Layer, Circle, Image } from "react-konva";
import useImage from 'use-image';

function Canva() {

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* <PhotoFrame imgSrc={"/nfts/cat.jpeg"} width={200} height={200} x={100} y={200} frame={Frame.Frame1} />
        <PhotoFrame imgSrc={"/nfts/monkey.jpeg"} width={200} height={300} x={320} y={200} frame={Frame.Frame2} /> */}
      </Layer>
    </Stage>
  );
}

export default Canva;