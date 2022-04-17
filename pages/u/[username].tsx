import { gql, useQuery } from "@apollo/client";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Loading from "../../components/common/Loading/Loading";
import { getRoomOfUser } from "../../__generated__/getRoomOfUser";
import { transformMainRoom } from "../main-room";

const GET_ROOM_OF_USER = gql`
  query getRoomOfUser($username: String!){
    getRoomOfUser(username: $username) {
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
          strokeWidth
          strokeColor
          spaceFillColor,
          spaceWidth,
          photoFrameUrl
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

const RoomCanva = dynamic(() => import("../../components/Room/RoomCanva"), {
  ssr: false,
});

const UserPage: NextPage = () => {
  const router = useRouter()
  const { username } = router.query

  const { data, loading, error } = useQuery<getRoomOfUser>(GET_ROOM_OF_USER, { 
    fetchPolicy: 'no-cache',
    variables: { username }
  });

  if (loading) {
    return (<Loading fullScreen={true} />);
  }

  if(!data?.getRoomOfUser.data) {
    return (<Loading fullScreen={true} />);
  }

  console.log(`data: ${data!.getRoomOfUser!.data!}`)


  return <RoomCanva room={transformMainRoom(data!.getRoomOfUser!.data!)} editable={false} />
  
}

export default UserPage;