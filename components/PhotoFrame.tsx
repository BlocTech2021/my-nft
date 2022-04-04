import { Layer, Image, Rect, Group } from "react-konva";
import useImage from 'use-image';

export enum Frame {
  Frame1,
  Frame2
}

export type PhotoFrameProps = {
  x: number;
  y: number;
  imgSrc: string;
  width: number;
  height: number;
  frame: Frame | undefined;
}

function PhotoFrame({ x, y, imgSrc, width, height, frame } : PhotoFrameProps) {
  let frameSrc = undefined;
  let frameImage: HTMLImageElement | undefined = undefined;
  switch(frame) {
    case Frame.Frame1:
      frameSrc = "/frames/frame1.png";
      break;
    case Frame.Frame2:
      frameSrc = "/frames/frame2.png";
      break;
  }

  if (frameSrc) {
    [frameImage] = useImage(frameSrc);
  }
  const [image] = useImage(imgSrc);

  if (image) {
    console.log(`Image ${image.src} width: ${image.width}, height: ${image.height}`)
  }

  return (
    <Group width={width} height={height} x={x} y={y} draggable>
      <Image image={image} width={width - 20} height={height - 20} x={10} y={10} 
        />
      {
        frameSrc &&  
          <Image image={frameImage} width={width} height={height}
            x={0} y={0} shadowBlur={12} />
      }
    </Group>
  
  )
}

export default PhotoFrame;