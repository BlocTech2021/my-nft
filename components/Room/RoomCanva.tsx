import { Dispatch, SetStateAction, useState } from "react";
import { Stage, Layer, Circle, Image, Rect } from "react-konva";
import useImage from "use-image";
import { Color, getColorByName } from "../../lib/colors/color";
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

  const [image] = useImage(room.backgroundImage?? '');

  function renderBackground(room: Room) {
    if (room.backgroundImage) {
      return (
        <Image image={image} width={window.innerWidth} height={window.innerHeight} listening={false} />
      )
    } else if (room.backgroundColor) {
      const color = getColorByName(room.backgroundColor);
      return (
        <Rect width={window.innerWidth} height={window.innerHeight} listening={false} 
            fillLinearGradientStartPoint={{x: 0, y: 0}}
            fillLinearGradientEndPoint={{x: 0, y: window.innerHeight}}
            fillLinearGradientColorStops={[
              0,
              color.startRgb,
              1,
              color.stopRgb,
            ]} />
      )
    } 

  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} onClick={() => {
      if(!selectAssetWithId) {
        return;
      }
      selectAssetWithId(undefined) 
    }}>
      <Layer>
        { renderBackground(room) }
      </Layer>
      <Layer offsetX={-window.innerWidth / 2} offsetY={-window.innerHeight / 2}>
        {/* <PhotoFrame imgSrc={"/nfts/cat.jpeg"} width={200} height={200} x={100} y={200} frame={Frame.Frame1} />
        <PhotoFrame imgSrc={"/nfts/monkey.jpeg"} width={200} height={300} x={320} y={200} frame={Frame.Frame2} /> */}

        {
          room.assets.map(asset => (
            <PhotoFrame key={asset.id} asset={asset} 
              isSelected={asset.id === selectedAssetId}
              selectAssetWithId={editable ? selectAssetWithId : undefined}
              onAssetEdit={editable ? onAssetEdit : undefined} />
          ))
        }
      </Layer>
    </Stage>
  );
}

export default RoomCanva;