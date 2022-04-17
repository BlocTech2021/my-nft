import { NextPage } from "next";
import { RequireAuth } from "../lib/contexts/RequireAuth";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { getMainRoom, getMainRoom_getMainRoom_data, getMainRoom_getMainRoom_data_assets } from "../__generated__/getMainRoom";
import { Asset, Room } from "../lib/types";
import Loading from "../components/common/Loading/Loading";

const MainRoom = dynamic(() => import("../components/Room/MainRoom"), {
  ssr: false,
});

const GET_MAIN_ROOM_QUERY = gql`
  query getMainRoom {
    getMainRoom {
      ok
      error
      data {
        id
        isMain
        backgroundColor
        backgroundImage
        userAddress
        assets {
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
          openseaAssetContract
          openseaTokenId
          openseaImageUrl
          openseaImageThumbnailUrl
        }
      }
    }
  }
`;

export function transformMainRoom(roomData: getMainRoom_getMainRoom_data): Room {
  const { id, isMain, backgroundColor, backgroundImage, userAddress, assets } = roomData;
  return {
    id, isMain, 
    backgroundColor: backgroundColor?? undefined, backgroundImage: backgroundImage?? undefined, userAddress,
    assets: assets.map(asset => transformAsset(asset))
  }
}

export function transformAsset(assetData: getMainRoom_getMainRoom_data_assets): Asset {
  const { id,
    roomId,
    userAddress,
    x,
    y,
    width,
    height,
    photoFrameUrl,
    strokeWidth,
    strokeColor,
    shadow,
    spaceFillColor,
    spaceWidth,
    openseaId,
    openseaAssetContract,
    openseaTokenId,
    openseaImageUrl,
    openseaImageThumbnailUrl,
  } = assetData;
  
  return {
    id,
    roomId,
    userAddress,
    x,
    y,
    width,
    height,
    photoFrameUrl: photoFrameUrl ? photoFrameUrl : undefined,
    strokeWidth,
    strokeColor: strokeColor ? strokeColor : undefined,
    shadow,
    spaceFillColor: spaceFillColor ? spaceFillColor : undefined,
    spaceWidth: spaceWidth ? spaceWidth : undefined,
    openseaId,
    openseaAssetContract,
    openseaTokenId,
    openseaImageUrl,
    openseaImageThumbnailUrl,
  }
}

const colors = ['#2196F3', '#009688', '#9C27B0', '#FFEB3B', '#afbbc9', '#4CAF50', '#2d3748', '#f56565', '#ed64a6']

const MainRoomPage: NextPage = () => {

  const { data, loading, error } = useQuery<getMainRoom>(GET_MAIN_ROOM_QUERY, { fetchPolicy: 'no-cache' });

  if (loading) {
    return (<RequireAuth><Loading fullScreen={true} /></RequireAuth>);
  }

  if (error) {
    return (<RequireAuth><h1>Error</h1></RequireAuth>);
  }

  return (
    <RequireAuth>
      {
        data && data.getMainRoom.ok &&
        <MainRoom room={transformMainRoom(data.getMainRoom.data!)} />
      }
    </RequireAuth>
  )
}

export default MainRoomPage;
