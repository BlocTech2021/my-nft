import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import { getColorByName, hexToRgb } from "../../lib/colors/color";
import { AssetEdit, Room } from "../../lib/types";
import PhotoFrame from "../PhotoFrame";
import { Portal } from 'react-konva-utils';
import { Gif } from '../common/Gif/Gif';

export type RoomCanvaProps = {
  room: Room,
  editable: boolean,
  onAssetEdit?: (assetEdit: AssetEdit) => any,
  selectedAssetId?: string,
  selectAssetWithId?: Dispatch<SetStateAction<string | undefined>>
}

function RoomCanva({ room, editable, onAssetEdit, selectedAssetId, selectAssetWithId }: RoomCanvaProps) {

  let backgroundStyle = {};
  let photosLayer: any = useRef(null);
  let dragLayer: any = useRef(null);

  const [draggingAssetId, setDraggingAssetId] = useState<string | null>(null);

  const onDragStart = (photo: Shape<ShapeConfig>, assetId: string) => {
    // photo.moveTo(dragLayer.current);
    setDraggingAssetId(assetId);
  }

  const onDragEnd = (photo: Shape<ShapeConfig>) => {
    // photo.moveTo(photosLayer.current);
    setDraggingAssetId(null);
  }
  
  const stageDraggable = !editable;
  const [stageDragging, setStageDragging] = useState<boolean>(false);

  if (room.backgroundImage) {
    backgroundStyle = {
      backgroundImage: `url(${room.backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  } else if (room.backgroundColor) {
    const color = getColorByName(room.backgroundColor);
    backgroundStyle = {
      backgroundImage: `linear-gradient(${hexToRgb(color.startRgb)}, ${hexToRgb(color.stopRgb)})`,
    }
  }


  return (
    <div style={backgroundStyle} className="w-full h-full">
      <Stage draggable={stageDraggable} width={window.innerWidth} height={window.innerHeight}
        onMouseEnter={(e: any) => {
          if(!stageDraggable) {
            return;
          }

          // style stage container:
          const container = e.target.getStage().container();
          if(stageDragging) {
            container.style.cursor = "grabbing";
          } else {
            container.style.cursor = "grab";
          }
        }}
        onMouseLeave={(e: any) => {
          if(!stageDraggable) {
            return;
          }
          const container = e.target.getStage().container();
          container.style.cursor = "default";
        }}
        onMouseDown={(e: any) => {
          if(!stageDraggable) {
            return;
          }
          console.log('onMouseDown');
          setStageDragging(true);
          const container = e.target.getStage().container();
          container.style.cursor = "grabbing";
        }}
        onMouseUp={(e: any) => {
          if(!stageDraggable) {
            return;
          }
          console.log('onMouseUp');
          const container = e.target.getStage().container();
          container.style.cursor = "grab";
          setStageDragging(false);
        }}
        onClick={() => {
          if(!selectAssetWithId) {
            return;
          }
          selectAssetWithId(undefined) 
        }}>
        {/* put origin as center of screen */}
        <Layer ref={photosLayer} offsetX={-window.innerWidth / 2} offsetY={-window.innerHeight / 2}>
          
            {
              room.assets.map(asset => (
                <Portal key={asset.id} selector=".drag-layer" enabled={draggingAssetId == asset.id}>
                  <PhotoFrame key={asset.id} asset={asset} 
                    isSelected={asset.id === selectedAssetId}
                    selectAssetWithId={selectAssetWithId}
                    onAssetEdit={editable ? onAssetEdit : undefined}
                    onDragStart={editable ? onDragStart : undefined}
                    onDragEnd={editable ? onDragEnd : undefined} />
                </Portal>
              ))
            }
          
        </Layer>
        {/** Drag layer */}
        <Layer name="drag-layer" ref={dragLayer} offsetX={-window.innerWidth / 2} offsetY={-window.innerHeight / 2}>
        </Layer>
      </Stage>
    </div>
  );
}

export default RoomCanva;