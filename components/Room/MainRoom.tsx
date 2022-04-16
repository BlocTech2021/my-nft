import { gql, useMutation } from "@apollo/client";
import classNames from "classnames";
import { useState } from "react";
import toast from "react-hot-toast";
import { allColors } from "../../lib/colors/color";
import { toastError, toastSuccess } from "../common/toastUtils";
import { Asset, AssetEdit, Room, RoomEdit, RoomWithAssetsEdit } from "../../lib/types";
import { updateRoom, updateRoomVariables } from "../../__generated__/updateRoom";
import EditBox from "./EditBox";
import RoomCanva from "./RoomCanva";

const UPDATE_ROOM_MUTATION = gql`
  mutation updateRoom($roomId: String!, 
    $roomInput:UpdateRoomInput,
    $assetsInput:[AssetEdit!]
  ) {
    updateRoom(
      roomId: $roomId,
      roomInput: $roomInput,
      assetsInput: $assetsInput
    ) {
      ok
      error
    }
}
`;


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

  const initialRoomWithAssetsEdit = () => ({ assetsEdit: new Map<string, AssetEdit>() })

  const [roomWithAssetsEdit, setRoomWithAssetsEdit] = useState<RoomWithAssetsEdit>(initialRoomWithAssetsEdit())

  const [selectedAssetId, selectAssetWithId] = useState<string | undefined>(undefined);

  // For mutation
  const onUpdateRoomCompleted = async ({ updateRoom }: updateRoom) => {
    if(updateRoom.ok) {
      console.log(`onUpdateRoomCompleted ok`)
      setRoomWithAssetsEdit(initialRoomWithAssetsEdit())
      toastSuccess("Changes successfully saved!");
    } else {
      toastError(`Error: ${updateRoom.error}`);
      console.log(`Error: ${updateRoom.error}`);
    }
  }

  const onUpdateRoomError = (error: any) => {
    console.log(`onUpdateRoomError: ${error}`);
  }

  const [updateRoom, { loading }] = useMutation<updateRoom, updateRoomVariables>(UPDATE_ROOM_MUTATION, 
    { onCompleted: onUpdateRoomCompleted, onError: onUpdateRoomError })

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
    setRoom({ ...otherAttrs, assets: [...assets.slice(0, assetIndex),
      {...assets[assetIndex], ...assetEdit}, ...assets.slice(assetIndex + 1, assets.length)] })

    setRoomWithAssetsEdit(({ roomEdit, assetsEdit }) => ({ roomEdit, 
      assetsEdit: assetsEdit.set(assetEdit.id, {...assetsEdit.get(assetEdit.id), ...assetEdit}) }))
  }

  const onAssetRemoved = (asset: Asset) => {
    const { assets, ...otherAttrs } = room;
    const assetIndex = assets.findIndex(asset => asset.id === asset.id);
    if (assetIndex < 0) {
      return;
    }
    if (selectedAssetId === asset.id) {
      selectAssetWithId(undefined);
    }
    
    setRoom({ ...otherAttrs, assets: assets.filter(existAsset => existAsset.id !== asset.id) });

    setRoomWithAssetsEdit(({ roomEdit, assetsEdit }) => {
      assetsEdit.delete(asset.id);
      return { roomEdit, assetsEdit}
    });
    
  }


  const onRoomEdit = (roomEdit: RoomEdit) => {
    setRoom({ ...room, ...roomEdit });

    const { roomEdit: existingRoomEdit, assetsEdit } = roomWithAssetsEdit;
    setRoomWithAssetsEdit({assetsEdit, roomEdit: { ...existingRoomEdit, ...roomEdit }});
  }

  const onSaveChanges = () => {
    updateRoom({
      variables: {
        roomId: room.id,
        roomInput: roomWithAssetsEdit.roomEdit,
        assetsInput: Array.from(roomWithAssetsEdit.assetsEdit.values())
      }
    });
  }

  return (
    <>
      <RoomCanva room={room} onAssetEdit={onAssetEdit}
        selectedAssetId={selectedAssetId} selectAssetWithId={selectAssetWithId} />
      
      <EditBox room={room} 
        onRoomEdit={onRoomEdit}
        onAssetCreated={onAssetCreated}
        selectedAsset={room.assets.find(asset => asset.id === selectedAssetId)}
        onAssetEdit={onAssetEdit}
        onAssetRemoved={onAssetRemoved}
         />
      
      <div className='fixed top-5 right-52'>
        <button
          onClick={() => onSaveChanges()}
          disabled={loading || (!roomWithAssetsEdit.roomEdit && roomWithAssetsEdit.assetsEdit.size === 0)}
          type="button"
          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          { loading ? 'Saving...' : 'Save Changes' }
        </button>
      </div>
    </>
  )
}

export default MainRoom;