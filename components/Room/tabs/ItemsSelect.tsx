import { gql, useQuery } from "@apollo/client";
import { Tab } from "@headlessui/react";
import { getOpenseaAssets, getOpenseaAssetsVariables } from "../../../__generated__/getOpenseaAssets";
import Loading from "../../common/Loading/Loading";

export const GET_OPENSEA_ASSETS = gql`
  query getOpenseaAssets($ownerAddress: String!, $cursor: String) {
    getOpenseaAssets(ownerAddress: $ownerAddress, cursor: $cursor) {
      ok
      data {
        previous
        next
        assets {
          openseaId
          openseaName
          openseaTokenId
          openseaAssetContract
          openseaImageUrl
          openseaImagePreviewUrl
          openseaImageOriginalUrl
          openseaImageThumbnailUrl
        }
      }
    }
  }
`

export function ItemsSelect() {
  const { data, loading, error } = useQuery<getOpenseaAssets, getOpenseaAssetsVariables>(GET_OPENSEA_ASSETS, {
    variables: { ownerAddress: '0x3DC22CB5a37C96d962194c9a0Cd8AFBA7710137C' }
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="pt-10 pb-8 px-4 space-y-10">
        <div className="grid grid-cols-3 gap-x-4 max-h-80 overflow-y-scroll">
          {
            data?.getOpenseaAssets.data?.assets.map(asset => (
              <div className="group relative text-sm">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75 mb-1">
                  <img src={asset.openseaImageThumbnailUrl} className="object-center object-cover" />  
                </div>
              </div>
           ))
          }
        </div>
      </div>
    </div>
  )
}
