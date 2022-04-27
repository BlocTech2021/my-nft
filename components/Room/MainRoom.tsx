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
import { useAuth } from "../../lib/contexts/auth";
import { ClipboardCopyIcon, LogoutIcon, SaveIcon } from "@heroicons/react/solid";
import { BiCopyAlt } from 'react-icons/bi'
import { FaShare } from "react-icons/fa";

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

  const initialRoomWithAssetsEdit = () => ({ assetsEdit: new Map<string, AssetEdit>() })

  const [roomWithAssetsEdit, setRoomWithAssetsEdit] = useState<RoomWithAssetsEdit>(initialRoomWithAssetsEdit())

  const [selectedAssetId, selectAssetWithId] = useState<string | undefined>(undefined);
  
  const { isLoggedIn, user } = useAuth()
  
  // For mutation
  const onUpdateRoomCompleted = async ({ updateRoom }: updateRoom) => {
    if(updateRoom.ok) {
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

    if (!assetEdit.updatedTime) {
      setRoom({ ...otherAttrs, assets: [...assets.slice(0, assetIndex),
        {...assets[assetIndex], ...assetEdit}, ...assets.slice(assetIndex + 1, assets.length)] })
    } else {
      // If the updatedTime is set, we move the asset to the last so it appears at the top
      setRoom({ ...otherAttrs, assets: [...assets.slice(0, assetIndex), ...assets.slice(assetIndex + 1, assets.length),
        {...assets[assetIndex], ...assetEdit}] })
    }

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
    console.log(`onSaveChanges: ${JSON.stringify(Array.from(roomWithAssetsEdit.assetsEdit.values()))}`)
    updateRoom({
      variables: {
        roomId: room.id,
        roomInput: roomWithAssetsEdit.roomEdit,
        assetsInput: Array.from(roomWithAssetsEdit.assetsEdit.values())
      }
    });
  }

  const userRoomUrl = typeof window !== "undefined" ? `${window.location.origin}/u/${user?.user.username}` : ''

  const [showCopied, setShowCopied] = useState<boolean>(false);

  return (
    <>
      <RoomCanva room={room} editable={true} onAssetEdit={onAssetEdit}
        selectedAssetId={selectedAssetId} selectAssetWithId={selectAssetWithId} />
      
      <EditBox room={room} 
        onRoomEdit={onRoomEdit}
        onAssetCreated={onAssetCreated}
        selectedAsset={room.assets.find(asset => asset.id === selectedAssetId)}
        onAssetEdit={onAssetEdit}
        onAssetRemoved={onAssetRemoved}
         />

      
        {
          isLoggedIn &&
          <div className='fixed top-5 left-10 flex align-center'>
            <input
              type="text"
              className="max-w-xl p-1 block w-56 shadow-sm bg text-pearl sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              value={userRoomUrl}
            />
            <div className="text-pearl cursor-pointer ml-3 bg p-2 rounded-md"
              onClick={() => { typeof window !== "undefined" && window.open(userRoomUrl, '_blank')!.focus(); }}>
              <FaShare className="h-5 w-5 text-white" />
            </div>

            <div className="text-pearl cursor-pointer ml-3 bg p-2 rounded-md"
              onClick={() => { 
                navigator.clipboard.writeText(userRoomUrl);
                setShowCopied(true);
                setTimeout(() => {
                  setShowCopied(false);
                }, 1000);
              }}>
              <BiCopyAlt className="h-5 w-5 text-white sm:max-w-xs sm:text-sm" />
            </div>

            {
              showCopied &&
              <span className="ml-1 text-pearl bg py-1 px-2 rounded-md">Copied!</span>
            }
           
            
          </div>
        }
      
      
      <div className='fixed top-5 right-52'>
        <button
          onClick={() => onSaveChanges()}
          disabled={loading || (!roomWithAssetsEdit.roomEdit && roomWithAssetsEdit.assetsEdit.size === 0)}
          type="button"
          className="disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-pearl bg focus:outline-none"
        >
          <SaveIcon className="ml-2 mr-2 h-5 w-5" aria-hidden="true" />
          { loading ? 'Saving...' : 'Save Changes' }
        </button>
      </div>
    </>
  )
}

export default MainRoom;