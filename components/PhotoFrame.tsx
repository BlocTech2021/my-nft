import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Image, Group, Rect, Transformer, Shape as ReactShape } from "react-konva";
import useImage from 'use-image';
import { Asset, AssetEdit } from "../lib/types";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Gif } from "./common/Gif/Gif";

export type PhotoFrameProps = {
  asset: Asset;
  isSelected: boolean;
  selectAssetWithId?: Dispatch<SetStateAction<string | undefined>>;
  onAssetEdit?: (assetEdit: AssetEdit) => any;
  onDragStart?: (photo: Shape<ShapeConfig>, assetId: string) => void;
  onDragEnd?: (photo: Shape<ShapeConfig>, assetId: string) => void;
}

function PhotoFrame({ asset, isSelected, selectAssetWithId, onAssetEdit, onDragStart, onDragEnd } : PhotoFrameProps) {
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
  const [frameImage] = useImage(photoFrameUrl?? '');
  const [image] = useImage(openseaImageUrl);

  const spaceWidthFixed = spaceWidth?? 0;

  return (
    <>
      <Group ref={shapeRef} width={width} height={height} x={x} y={y} draggable={!!selectAssetWithId}
        onDragStart={(e) => {
          if(!onDragStart) {
            return;
          }
          if(isSelected) {
            onDragStart(trRef.current, asset.id)
          }
          onDragStart(e.target as any, asset.id)
        }}

        onDragEnd={(e) => {
          if(!onAssetEdit || !onDragEnd) {
            return;
          }
          onDragEnd(e.target as any, asset.id)
          if(isSelected) {
            onDragEnd(trRef.current, asset.id)
          }
          onAssetEdit({
            id: asset.id,
            x: e.target.x(),
            y: e.target.y(),
            updatedTime: new Date().getTime(),
          })
        }}

        onClick={(e) => {
          if(!selectAssetWithId || !onAssetEdit) {
            return;
          }
          selectAssetWithId(asset.id)
          onAssetEdit({
            id: asset.id,
            updatedTime: new Date().getTime(),
          });
          e.cancelBubble = true;
        }}

        onTransformEnd={(e) => {
          if(!onAssetEdit) {
            return;
          }

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
          shadowBlur={shadow} shadowEnabled={shadow > 0} fill={spaceFillColor} shadowColor={'black'}
          shadowOffsetX={4} shadowOffsetY={4} shadowOpacity={0.4} />
        
        {
          asset.assetType === 'image/gif' ? 
            <Gif src={openseaImageUrl} width={width - (spaceWidth?? 0) * 2} height={height - (spaceWidth?? 0) * 2}
              x={spaceWidth?? 0} y={spaceWidth?? 0} /> :
            <Image image={image}
              width={width - (spaceWidth?? 0) * 2} height={height - (spaceWidth?? 0) * 2}
              x={spaceWidth?? 0} y={spaceWidth?? 0} />
        }

        
        
        {/* <ReactShape sceneFunc={(context, shape) => {
              
              context.beginPath();
              // let gradient = context.createLinearGradient(spaceWidthFixed, spaceWidthFixed, spaceWidthFixed + Math.ceil(width / 11), height - spaceWidthFixed)
              context.moveTo(spaceWidthFixed, spaceWidthFixed);
              context.lineTo(spaceWidthFixed + Math.ceil(width / 3), spaceWidthFixed);
              context.lineTo(spaceWidthFixed + Math.ceil(width / 11), height - spaceWidthFixed);
              context.lineTo(spaceWidthFixed, height - spaceWidthFixed);
              context.lineTo(spaceWidthFixed, spaceWidthFixed);
              context.closePath();
               context.fill();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            // fill="rgba(255,255,255)"
            fillLinearGradientStartPoint={{ x: spaceWidthFixed, y: spaceWidthFixed  }}
            fillLinearGradientEndPoint={{ x: spaceWidthFixed + Math.ceil(width / 11), y: height - spaceWidthFixed  }}
            fillLinearGradientColorStops={[0, 'rgba(255,255,255)', 1, 'rgba(255,255,255)']}
            opacity={0.1}
            stroke="rgba(254,254,254)"
            strokeWidth={0} /> */}
        <ReactShape sceneFunc={(context, shape) => {
              const spaceWidthFixed = spaceWidth?? 0;
              context.beginPath();
              context.moveTo(spaceWidthFixed + Math.ceil(width / 3), spaceWidthFixed);
              context.lineTo(width - spaceWidthFixed, spaceWidthFixed);
              context.lineTo(width - spaceWidthFixed, height - spaceWidthFixed);
              context.lineTo(spaceWidthFixed + Math.ceil(width / 11), height - spaceWidthFixed);
              context.lineTo(spaceWidthFixed + Math.ceil(width / 3), spaceWidthFixed);
              context.closePath();
               context.fill();
              // (!) Konva specific method, it is very important
              context.fillStrokeShape(shape);
            }}
            fill="#777777"
            opacity={0.03}
            stroke="rgba(254,254,254)"
            strokeWidth={0} />

        {
          !!photoFrameUrl &&
            <Image image={frameImage} width={width + 0} height={height + 0}
              x={0} y={0} alt="Frame" />
        }

        
      </Group>
      {isSelected && (
        <Transformer
          rotateEnabled={false}
          ref={trRef}
          padding={5}
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