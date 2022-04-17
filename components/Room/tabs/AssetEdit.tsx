import { Asset, AssetEdit } from "../../../lib/types"
import { Range } from "react-range";
import { allColors } from "../../../lib/colors/color";
import { ColorSelector } from "../../common/Color/ColorSelector";
import { gql, useMutation, useQuery } from "@apollo/client";
import { removeAsset, removeAssetVariables } from "../../../__generated__/removeAsset";
import { toastError, toastSuccess } from "../../common/toastUtils";
import { getAllFrameImages } from "../../../__generated__/getAllFrameImages";
import classNames from "classnames";

const REMOVE_ASSET_MUTATION = gql`
  mutation removeAsset($roomId: String!, $id: String!) {
    removeAsset(roomId:$roomId,
      id: $id) {
      ok
      error
      data {
        id
      }
    }
  }
`

const GET_ALL_FRAME_IMAGES = gql`
  query getAllFrameImages {
    getAllFrameImages {
      ok
      data {
        cloudinaryId
        publicId
        thumbnailUrl
        url
      }
    }
  }
`;

export type AssetEditTabProps = {
  asset: Asset,
  onAssetEdit: (assetEdit: AssetEdit) => any,
  onAssetRemoved: (asset: Asset) => any
}

export function AssetEditTab({ asset, onAssetEdit, onAssetRemoved }: AssetEditTabProps) {

  const { data: frameData, loading, error } = useQuery<getAllFrameImages>(GET_ALL_FRAME_IMAGES);
  
  const onRemoveAssetCompleted = async ({ removeAsset }: removeAsset) => {
    const { ok, error, data } = removeAsset;
    if(ok) {
      toastSuccess("Asset removed successfully");
      onAssetRemoved(asset);
    } else {
      toastError("Failed to remove asset");
      console.log(`Create Asset failed: ${error}`);
    }
  }

  const onRemoveAssetError = (error: any) => {
    console.log(`onCreateAssetError: ${error}`);
  }

  const [removeAsset, { loading: removeAssetLoading }] = useMutation<removeAsset, removeAssetVariables>(REMOVE_ASSET_MUTATION, 
    { onCompleted: onRemoveAssetCompleted, onError: onRemoveAssetError })

  return (
    <div className="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-2">
          Frame
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="rounded-md shadow-xs px-0 py-0 flex overflow-x-scroll">
            <div className={classNames(asset.photoFrameUrl ? 'border-slate-200' : 'border-black', "w-12 h-9 border-2 mr-1 cursor-pointer")}
              onClick={() => {
                onAssetEdit({ id: asset.id, photoFrameUrl: '' })
              }}> {/** This is for no frame image */}

            </div>

            {
              frameData && frameData.getAllFrameImages && frameData.getAllFrameImages.data &&
              frameData.getAllFrameImages.data.map(frameImg => (
                  <div key={frameImg.publicId} className={classNames(frameImg.url === asset.photoFrameUrl ? 'border-black border-2' : '', "w-12 h-9 mr-1 cursor-pointer")}
                    onClick={() => {
                      onAssetEdit({ id: asset.id, photoFrameUrl: frameImg.url })
                    }}>
                    <img src={frameImg.thumbnailUrl} alt="Background Image" className="w-full h-full" />
                  </div>
                ))
            }
          </div>
        </div>
      </div>

      <div className="sm:col-span-6">
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

      <div className="sm:col-span-6">
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

      <div className="sm:col-span-6">
        <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-0">
          Border Width
        </label>
        <div className="mt-1 flex rounded-md shadow-sm w-full">
          <div className="rounded-md shadow-xs px-0 py-0 flex w-full">
            <Range
                step={1}
                min={0}
                max={15}
                values={[asset.strokeWidth]}
                onChange={(values) => {
                  onAssetEdit({
                    id: asset.id,
                    strokeWidth: values[0]
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

      <div className="sm:col-span-6">
        <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-0">
          Border Color
        </label>
        <div className="mt-1 flex rounded-md shadow-sm w-full">
          <div className="rounded-md shadow-xs px-0 py-0 flex w-full">
            <ColorSelector
              isSelected={(color, _colorIndex) => asset.strokeColor === color.startRgb}
              onColorClicked={(color, _colorIndex) => onAssetEdit({
                id: asset.id,
                strokeColor: color.startRgb
              }) } />
          </div>
        </div>
      </div>

      <div className="sm:col-span-6">
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
      <div className="sm:col-span-6">
        <button className="w-full p-0 text-center inline-block items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={removeAssetLoading}
          onClick={() => {
            removeAsset({variables: { roomId: asset.roomId, id: asset.id }})
          }}>
          { removeAssetLoading ? 'Removing Asset...' : 'Remove Asset' }
          </button>
      </div>
    </div>
  )
}