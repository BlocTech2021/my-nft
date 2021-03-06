import { NextPage } from "next";
import { RequireAuth } from "../lib/contexts/RequireAuth";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { getMainRoom, getMainRoom_getMainRoom_data, getMainRoom_getMainRoom_data_assets } from "../__generated__/getMainRoom";
import { Asset, Room } from "../lib/types";
import Loading from "../components/common/Loading/Loading";
import { getRoomOfUser_getRoomOfUser_data } from "../__generated__/getRoomOfUser";

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
          openseaName
          openseaAssetContract
          openseaTokenId
          openseaImageUrl
          openseaImageThumbnailUrl
          assetType
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
    openseaName,
    openseaAssetContract,
    openseaTokenId,
    openseaImageUrl,
    openseaImageThumbnailUrl,
    assetType,
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
    openseaName: openseaName ? openseaName : undefined,
    openseaAssetContract,
    openseaTokenId,
    openseaImageUrl,
    openseaImageThumbnailUrl,
    assetType
  }
}

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
