import { Asset, AssetEdit } from "../../../lib/types"
import { Range } from "react-range";
import { allColors } from "../../../lib/colors/color";
import { ColorSelector } from "../../common/Color/ColorSelector";

export type AssetEditTabProps = {
  asset: Asset,
  onAssetEdit: (assetEdit: AssetEdit) => any
}

export function AssetEditTab({ asset, onAssetEdit }: AssetEditTabProps) {
  return (
    <div className="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-4">
        <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-0">
          Space
        </label>
        <div className="mt-1 flex rounded-md shadow-sm w-full">
          <div className="rounded-md shadow-xs px-0 py-0 flex w-full">
            <Range
                step={1}
                min={0}
                max={20}
                values={[asset.spaceWidth?? 0]}
                onChange={(values) => {
                  onAssetEdit({
                    id: asset.id,
                    spaceWidth: values[0]
                  })
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="w-full h-2 pr-2 my-2 bg-gray-200 rounded-md"
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="w-3 h-3 transform translate-x-10 bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                )}
              />
          </div>
        </div>
      </div>

      <div className="sm:col-span-4">
        <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-0">
          Space Color
        </label>
        <div className="mt-1 flex rounded-md shadow-sm w-full">
          <div className="rounded-md shadow-xs px-0 py-0 flex w-full">
            <ColorSelector
              isSelected={(color, _colorIndex) => asset.spaceFillColor === color.startRgb}
              onColorClicked={(color, _colorIndex) => onAssetEdit({
                id: asset.id,
                spaceFillColor: color.startRgb
              }) } />
          </div>
        </div>
      </div>

      <div className="sm:col-span-4">
        <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-0">
          Shadow
        </label>
        <div className="mt-1 flex rounded-md shadow-sm w-full">
          <div className="rounded-md shadow-xs px-0 py-0 flex w-full">
            <Range
                step={1}
                min={0}
                max={30}
                values={[asset.shadow]}
                onChange={(values) => {
                  onAssetEdit({
                    id: asset.id,
                    shadow: values[0]
                  })
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="w-full h-2 pr-2 my-2 bg-gray-200 rounded-md"
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="w-3 h-3 transform translate-x-10 bg-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                )}
              />
          </div>
        </div>
      </div>
    </div>
  )
}