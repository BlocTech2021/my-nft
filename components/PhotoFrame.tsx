import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Image, Group, Rect, Transformer } from "react-konva";
import useImage from 'use-image';
import { Asset, AssetEdit } from "../lib/types";

export enum Frame {
  Frame1,
  Frame2
}

export type PhotoFrameProps = {
  asset: Asset;
  isSelected: boolean;
  selectAssetWithId: Dispatch<SetStateAction<string | undefined>>;
  onAssetEdit: (assetEdit: AssetEdit) => any
}

function PhotoFrame({ asset, isSelected, selectAssetWithId, onAssetEdit } : PhotoFrameProps) {
  const shapeRef: any = useRef();
  const trRef: any = useRef();

  useEffect(() => {
    if(isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected])

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
    <>
      <Group ref={shapeRef} width={width} height={height} x={x} y={y} draggable 
        onDragEnd={(e) => {
          onAssetEdit({
            id: asset.id,
            x: e.target.x(),
            y: e.target.y()
          })
        }}

        onClick={(e) => {
          selectAssetWithId(asset.id)
          e.cancelBubble = true;
        }}

        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          onAssetEdit({
            id: asset.id,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          })
        }}>
        <Rect x={0} y={0} width={width} height={height} strokeWidth={strokeWidth} stroke={strokeColor}
          shadowBlur={shadow} shadowEnabled={shadow > 0} fill={spaceFillColor} />
        <Image image={image}
          width={width - (spaceWidth?? 0) * 2} height={height - (spaceWidth?? 0) * 2}
          x={spaceWidth?? 0} y={spaceWidth?? 0} />
        {
          photoFrameUrl &&  
            <Image image={frameImage} width={width} height={height}
              x={0} y={0} alt="Frame" />
        }

        
      </Group>
      {isSelected && (
        <Transformer
          rotateEnabled={false}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  )
}

export default PhotoFrame;