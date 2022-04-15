import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Asset } from "../../../lib/types";
import { transformAsset } from "../../../pages/main-room";
import { createAsset, createAssetVariables } from "../../../__generated__/createAsset";
import { getOpenseaAssets, getOpenseaAssetsVariables } from "../../../__generated__/getOpenseaAssets";
import Loading from "../../common/Loading/Loading";
import Image from 'next/image'

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

const CREATE_ASSET_MUTATION = gql`
  mutation createAsset($roomId: String!, $width: Float!, $height: Float!,
    $openseaId: String!, $openseaName: String, $openseaAssetContract: String!,
    $openseaTokenId: String!, $openseaImageUrl: String!, $openseaImagePreviewUrl: String,
    $openseaImageThumbnailUrl: String!, $openseaImageOriginalUrl: String) {
    createAsset(input: {
      roomId:$roomId,
      width:$width,
      height:$height,
      openseaId: $openseaId,
      openseaName:$openseaName,
      openseaAssetContract: $openseaAssetContract,
      openseaTokenId: $openseaTokenId,
      openseaImageUrl: $openseaImageUrl,
      openseaImagePreviewUrl:$openseaImagePreviewUrl,
      openseaImageThumbnailUrl: $openseaImageThumbnailUrl,
      openseaImageOriginalUrl: $openseaImageOriginalUrl,
    }) {
      ok
      error
      data {
        id
        roomId
        userAddress
        x
        y
        width
        height
        photoFrameUrl
        strokeWidth
        strokeColor
        spaceFillColor
        spaceWidth
        shadow
        openseaId
        openseaName
        openseaAssetContract
        openseaTokenId
        openseaImageUrl
        openseaImageThumbnailUrl
      }
    }
  }
`;

type ItemsSelectProps = {
  roomId: string;
  onAssetCreated: (asset: Asset) => any
}

type ImageSize = {
  width: number;
  height: number;
}

export function ItemsSelect({ roomId, onAssetCreated } : ItemsSelectProps) {
  const { data, loading, error } = useQuery<getOpenseaAssets, getOpenseaAssetsVariables>(GET_OPENSEA_ASSETS, {
    variables: { ownerAddress: '0x3DC22CB5a37C96d962194c9a0Cd8AFBA7710137C' }
  });

  const [imageSizes, setImageSizes] = useState<Map<string, ImageSize>>(new Map<string, ImageSize>());

  const onCreateAssetCompleted = async ({ createAsset }: createAsset) => {
    const { ok, error, data } = createAsset;
    if(ok) {
      const asset = transformAsset(data!);
      onAssetCreated(asset);
    } else {
      console.log(`Create Asset failed: ${error}`);
    }
  }

  const onCreateAssetError = (error: any) => {
    console.log(`onCreateAssetError: ${error}`);
  }

  const [createAsset, { loading: createAssetLoading }] = useMutation<createAsset, createAssetVariables>(CREATE_ASSET_MUTATION, 
    { onCompleted: onCreateAssetCompleted, onError: onCreateAssetError })

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative">
      <div className="pt-10 pb-8 px-4 space-y-10">
        <div className="grid grid-cols-3 gap-x-4 max-h-80 overflow-y-scroll">
          {
            data?.getOpenseaAssets.data?.assets.map(asset => (
              <div key={asset.openseaId} className="group relative text-sm">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75 mb-1">
                  <Image src={asset.openseaImageThumbnailUrl} 
                    className="object-center object-cover"
                    onLoad={(e) => {
                      { /* keep image sizes so at server it can keep image ratio */ }
                      setImageSizes(
                        imageSizes.set(asset.openseaId, { width: (e.target as any).width, height: (e.target as any).height}))
                    }}

                    onClick={() => {
                      const imageSize = imageSizes.get(asset.openseaId);
                      const width = imageSize?.width?? 100;
                      const height = imageSize?.height?? 100;

                      createAsset({
                        variables: {
                          roomId,
                          width: width,
                          height: height,
                          openseaId: asset.openseaId,
                          openseaName: asset.openseaName,
                          openseaAssetContract: asset.openseaAssetContract,
                          openseaTokenId: asset.openseaTokenId,
                          openseaImageUrl: asset.openseaImageUrl,
                          openseaImagePreviewUrl: asset.openseaImagePreviewUrl,
                          openseaImageThumbnailUrl: asset.openseaImageThumbnailUrl,
                          openseaImageOriginalUrl: asset.openseaImageOriginalUrl,
                        }
                      })
                    }} />  
                </div>
              </div>
           ))
          }
        </div>
      </div>
      

      {
        createAssetLoading && 
        <div className="absolute top-0 left-0 w-full h-full z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">Adding Asset...</h2>
          <p className="w-1/3 text-center text-white">Waiting to add asset</p>
        </div>
      }
      
    </div>
  )
}
