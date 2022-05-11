import dynamic from "next/dynamic";
import { useState } from "react";
import { Room } from "../lib/types";
import AssetDetail from "./common/AssetDetail/AssetDetail";

type UserViewRoomProps = {
  room: Room
}

const RoomCanva = dynamic(() => import("./Room/RoomCanva"), {
  ssr: false,
});

function UserViewRoom({ room } : UserViewRoomProps) {
  const [selectedAssetId, selectAssetWithId] = useState<string | undefined>(undefined);
  
  const selectedAsset = room.assets.find(asset => asset.id === selectedAssetId)
  return (
    <>
      <RoomCanva room={room} editable={false} selectAssetWithId={selectAssetWithId} />
      { selectedAsset && <AssetDetail asset={selectedAsset} onClose={() => selectAssetWithId(undefined)} /> }
    </>
  )
}

export default UserViewRoom;