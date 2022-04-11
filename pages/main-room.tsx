import { NextPage } from "next";
import { RequireAuth } from "../lib/contexts/RequireAuth";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { getMainRoom, getMainRoom_getMainRoom_data } from "../__generated__/getMainRoom";
import { Room } from "../lib/types";
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
      }
    }
  }
`;

export function transformMainRoom(roomData: getMainRoom_getMainRoom_data): Room {
  const { id, isMain, backgroundColor, backgroundImage, userAddress, } = roomData;
  return {
    id, isMain, 
    backgroundColor: backgroundColor?? undefined, backgroundImage: backgroundImage?? undefined, userAddress
  }
}

const colors = ['#2196F3', '#009688', '#9C27B0', '#FFEB3B', '#afbbc9', '#4CAF50', '#2d3748', '#f56565', '#ed64a6']

const MainRoomPage: NextPage = () => {

  const { data, loading, error } = useQuery<getMainRoom>(GET_MAIN_ROOM_QUERY, { fetchPolicy: 'no-cache' });

  if (loading) {
    return (<RequireAuth><Loading /></RequireAuth>);
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
