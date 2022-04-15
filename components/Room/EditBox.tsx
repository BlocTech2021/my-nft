import classNames from "classnames"
import { useEffect, useState } from "react"
import { allColors } from "../../lib/colors/color"
import { Asset, AssetEdit, Room } from "../../lib/types"
import { AssetEditTab } from "./tabs/AssetEdit"
import { ItemsSelect } from "./tabs/ItemsSelect"
import { RoomEdit } from "./tabs/RoomEdit"

export type EditBoxProps = {
  room: Room,
  onBackgroundColorChanged: (colorIndex: number) => any
  onAssetCreated: (asset: Asset) => any,
  selectedAsset?: Asset,
  onAssetEdit: (assetEdit: AssetEdit) => any
}

export default function EditBox({ room, onBackgroundColorChanged, onAssetCreated, selectedAsset, onAssetEdit }: EditBoxProps) {

  const tabs = [
    { name: 'Room' },
    { name: 'Asset', disabled: !selectedAsset },
    { name: 'Items' },
  ]

  const [currentTabName, setCurrentTabName] = useState('Room');

  useEffect(() => {
    if(!selectedAsset && currentTabName === 'Asset') {
      setCurrentTabName('Room');
    }
  })

  return (
    <div className="absolute top-20 right-10 flex flex-col justify-center py-0 px-0 text-xs">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-6 px-2 shadow sm:rounded-lg sm:px-10">
            <div className="mx-auto w-96">
              <div>
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        className={classNames(
                          tab.disabled ? 'hidden' : '',
                          tab.name === currentTabName
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
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
                </div>
              </div>
              
              { currentTabName === 'Room' && <RoomEdit room={room} onBackgroundColorChanged={onBackgroundColorChanged} /> }
              { currentTabName === 'Asset' && selectedAsset && <AssetEditTab asset={selectedAsset} onAssetEdit={onAssetEdit} /> }
              { currentTabName === 'Items' && <ItemsSelect roomId={room.id} onAssetCreated={onAssetCreated} /> }
            </div>
          </div>
        </div>
      </div>
  )
}