import { NextPage } from "next";
import { RequireAuth } from "../lib/contexts/RequireAuth";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { getMainRoom, getMainRoom_getMainRoom_data } from "../__generated__/getMainRoom";
import { Room } from "../lib/types";
import Loading from "../components/common/Loading/Loading";

const RoomCanva = dynamic(() => import("../components/Room/RoomCanva"), {
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
        <RoomCanva room={transformMainRoom(data.getMainRoom.data!)}>
        </RoomCanva>  
      }
    </RequireAuth>
  )
}

export default MainRoomPage;
