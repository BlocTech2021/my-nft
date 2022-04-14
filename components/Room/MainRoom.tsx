import classNames from "classnames";
import { useState } from "react";
import { allColors } from "../../lib/colors/color";
import { Asset, AssetEdit, Room } from "../../lib/types";
import EditBox from "./EditBox";
import RoomCanva from "./RoomCanva";



export type MainRoomProps = {
  room: Room
}

function MainRoom(props: MainRoomProps) {

  const initialValue = { ...props.room };
  if (!initialValue.backgroundColor && !initialValue.backgroundImage) {
    initialValue.backgroundColor = allColors[0].name;
  }
  
  const [room, setRoom] = useState<Room>(initialValue);
  console.log(`initialValue: ${JSON.stringify(room)}`);

  const onBackgroundColorChanged = (colorIndex: number) => {
    setRoom({ ...room, backgroundColor: allColors[colorIndex].name, backgroundImage: undefined });
  }

  const onAssetCreated = (asset: Asset) => {
    const { assets, ...otherAttrs } = room;
    setRoom({ ...otherAttrs, assets: [...assets, asset] });
  }

  const onAssetEdit = (assetEdit: AssetEdit) => {
    const { assets, ...otherAttrs } = room;
    const assetIndex = assets.findIndex(asset => asset.id === assetEdit.id);
    if (assetIndex < 0) {
      return;
    }
    setRoom({ ...otherAttrs, assets: [...assets.slice(0, assetIndex), {...assets[assetIndex], ...assetEdit}, ...assets.slice(assetIndex + 1, assets.length)] })
  }

  return (
    <>
      <RoomCanva room={room} onAssetEdit={onAssetEdit} />
      
      <EditBox room={room} 
        onBackgroundColorChanged={onBackgroundColorChanged}
        onAssetCreated={onAssetCreated}
         />
      
      <div className='fixed top-5 right-52'>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </>
  )
}

export default MainRoom;