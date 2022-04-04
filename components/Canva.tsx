import { Stage, Layer, Circle, Image } from "react-konva";
import useImage from 'use-image';

function Canva() {
  const [cat] = useImage("/nfts/cat.jpeg")
  const [monkey] = useImage("/nfts/monkey.jpeg")

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle x={200} y={100} radius={50} fill="green" />
        <Image image={cat} width={200} height={200} x={100} y={200} />
        <Image image={monkey} width={200} height={300} x={320} y={200} />
      </Layer>
    </Stage>
  );
}

export default Canva;