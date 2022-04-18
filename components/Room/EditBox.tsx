import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid"
import classNames from "classnames"
import { useEffect, useState } from "react"
import { Asset, AssetEdit, Room, RoomEdit } from "../../lib/types"
import { AssetEditTab } from "./tabs/AssetEdit"
import { ItemsSelect } from "./tabs/ItemsSelect"
import { RoomEditTab } from "./tabs/RoomEdit"

export type EditBoxProps = {
  room: Room,
  onAssetCreated: (asset: Asset) => any,
  selectedAsset?: Asset,
  onAssetEdit: (assetEdit: AssetEdit) => any
  onRoomEdit: (roomEdit: RoomEdit) => any
  onAssetRemoved: (asset: Asset) => any
}

let previousSelectedAsset: any = undefined;

export default function EditBox({ room, onAssetCreated, selectedAsset, onAssetEdit, onAssetRemoved, onRoomEdit }: EditBoxProps) {

  const tabs = [
    { name: 'Room' },
    { name: 'NFT' },
    { name: 'Decoration', disabled: !selectedAsset },
  ]

  const [panelHidden, setPanelHidden] = useState<boolean>(false);

  const [currentTabName, setCurrentTabName] = useState(selectedAsset ? 'Decoration' : 'Room');

  useEffect(() => {
    if(!selectedAsset && currentTabName === 'Decoration') {
      setCurrentTabName('Room');
    }
    if(selectedAsset && selectedAsset !== previousSelectedAsset) {
      setCurrentTabName('Decoration');
      previousSelectedAsset = selectedAsset;
    } else if (!selectedAsset) {
      previousSelectedAsset = undefined;
    }
  })

  if (panelHidden) {
    return (
      <div className="bg-edit-box absolute top-20 right-10 opacity-90 text-pearl cursor-pointer p-2 sm:rounded-lg"
        onClick={() => setPanelHidden(false)}>
        <ArrowLeftIcon className="h-5 w-5 text-white" />
      </div>
    )
  }

  return (
    <div className="absolute top-20 right-10 flex flex-col justify-center py-0 px-0 text-xs opacity-90 text-pearl">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-edit-box text-pearl py-6 px-2 shadow sm:rounded-lg sm:px-10">
            <div className="mx-auto w-96">
              <div>
                <div className="border-b border-gray-200 flex justify-between items-end">
                  <nav className="-mb-px flex items-end space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        className={classNames(
                          tab.disabled ? 'hidden' : '',
                          tab.name === currentTabName
                            ? 'border-white text-pearl font-extrabold'
                            : 'border-transparent text-pearl font-medium',
                          'whitespace-nowrap py-4 px-1 border-b-2 cursor-pointer text-sm'
                        )}
                        aria-current={tab.name === currentTabName ? 'page' : undefined}
                        onClick = { e => {
                          e.preventDefault();
                          setCurrentTabName(tab.name);
                        }}
                      >
                        {tab.name}
                      </a>
                    ))}
                  </nav>
                  <div className="mb-4 text-pearl cursor-pointer"
                    onClick={() => setPanelHidden(true)}>
                    <ArrowRightIcon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              
              { currentTabName === 'Room' && <RoomEditTab room={room} onRoomEdit={onRoomEdit} /> }
              { currentTabName === 'NFT' && <ItemsSelect roomId={room.id} onAssetCreated={onAssetCreated} /> }
              { currentTabName === 'Decoration' && selectedAsset && 
                <AssetEditTab asset={selectedAsset}
                  onAssetEdit={onAssetEdit} onAssetRemoved={onAssetRemoved} /> }
            </div>
          </div>
        </div>
      </div>
  )
}