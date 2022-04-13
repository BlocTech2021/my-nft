import { Image, Group, Rect } from "react-konva";
import useImage from 'use-image';
import { Asset } from "../lib/types";

export enum Frame {
  Frame1,
  Frame2
}

export type PhotoFrameProps = {
  asset: Asset
}

function PhotoFrame({ asset } : PhotoFrameProps) {
  const { x, y, openseaImageUrl, width, height, photoFrameUrl, strokeWidth,
    strokeColor,  spaceWidth, spaceFillColor, shadow } = asset;
  // let frameSrc = undefined;
  // let frameImage: HTMLImageElement | undefined = undefined;
  // switch(photoFrameUrl) {
  //   case 'frame1':
  //     frameSrc = "/frames/frame1.png";
  //     break;
  //   case Frame.Frame2:
  //     frameSrc = "/frames/frame2.png";
  //     break;
  // }
  console.log(`shadow: ${shadow}`)
  const [frameImage] = useImage(photoFrameUrl?? '');
  const [image] = useImage(openseaImageUrl);

  if (image) {
    console.log(JSON.stringify(asset));
  }

  return (
    <Group width={width} height={height} x={x} y={y} draggable>
      <Rect x={0} y={0} width={width} height={height} strokeWidth={strokeWidth} stroke={strokeColor}
        shadowBlur={shadow} shadowEnabled={shadow > 0} fill={spaceFillColor} />
      <Image image={image}
        width={width - (spaceWidth?? 0) * 2} height={height - (spaceWidth?? 0) * 2}
        x={spaceWidth?? 0} y={spaceWidth?? 0} />
      {
        photoFrameUrl &&  
          <Image image={frameImage} width={width} height={height}
            x={0} y={0}  />
      }
    </Group>
  
  )
}

export default PhotoFrame;