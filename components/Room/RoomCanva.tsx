import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Dispatch, SetStateAction, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { getColorByName, hexToRgb } from "../../lib/colors/color";
import { AssetEdit, Room } from "../../lib/types";
import PhotoFrame from "../PhotoFrame";

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

  const onDragStart = (photo: Shape<ShapeConfig>) => {
    photo.moveTo(dragLayer.current);
  }

  const onDragEnd = (photo: Shape<ShapeConfig>) => {
    photo.moveTo(photosLayer.current);
  }
  

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
    <div style={backgroundStyle}>
      <Stage width={window.innerWidth} height={window.innerHeight} onClick={() => {
        if(!selectAssetWithId) {
          return;
        }
        selectAssetWithId(undefined) 
      }}>
        {/* put origin as center of screen */}
        <Layer ref={photosLayer} offsetX={-window.innerWidth / 2} offsetY={-window.innerHeight / 2}> 
          {
            room.assets.map(asset => (
              <PhotoFrame key={asset.id} asset={asset} 
                isSelected={asset.id === selectedAssetId}
                selectAssetWithId={editable ? selectAssetWithId : undefined}
                onAssetEdit={editable ? onAssetEdit : undefined}
                onDragStart={editable ? onDragStart : undefined}
                onDragEnd={editable ? onDragEnd : undefined} />
            ))
          }
        </Layer>
        {/** Drag layer */}
        <Layer ref={dragLayer} offsetX={-window.innerWidth / 2} offsetY={-window.innerHeight / 2}>
        </Layer>
      </Stage>
    </div>
  );
}

export default RoomCanva;