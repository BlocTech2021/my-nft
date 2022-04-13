import classNames from "classnames";
import { useState } from "react";
import { allColors } from "../../lib/colors/color";
import { Room } from "../../lib/types";
import EditBox from "./EditBox";
import RoomCanva from "./RoomCanva";



export type MainRoomProps = {
  room: Room
}

function MainRoom(props: MainRoomProps) {

  const initialValue = { ...props.room };
  if (!initialValue.backgroundColor && !initialValue.backgroundImage) {
    initialValue.backgroundColor = allColors[0].name;
  }
  
  const [room, setRoom] = useState<Room>(initialValue);
  console.log(`initialValue: ${JSON.stringify(room)}`);

  const onBackgroundColorChanged = (colorIndex: number) => {
    setRoom({ ...room, backgroundColor: allColors[colorIndex].name, backgroundImage: undefined });
  }

  return (
    <>
      <RoomCanva room={room} />
      
      <EditBox room={room} onBackgroundColorChanged={onBackgroundColorChanged} />
    </>
  )
}

export default MainRoom;