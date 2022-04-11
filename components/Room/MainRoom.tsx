import { useState } from "react";
import { allColors } from "../../lib/colors/color";
import { Room } from "../../lib/types";
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
      
      <div className="absolute top-20 right-10 flex flex-col justify-center py-0 px-0 text-xs">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-6 px-2 shadow sm:rounded-lg sm:px-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-sm font-medium text-gray-900">Room Config</h2>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-xs font-medium text-gray-700">
                    Background Color
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <div className="rounded-md shadow-xs px-0 py-0 flex">
                      {
                        allColors.map((color, colorIndex) => (
                          <div className="px-2">
                            <div role="checkbox" className="w-8 h-8 inline-flex rounded-full cursor-pointer border-4 border-white focus:outline-none focus:shadow-outline"
												        style={{ background: color.startRgb, boxShadow: room.backgroundColor === color.name ? '0 0 0 2px rgba(0, 0, 0, 0.2)' : undefined }}
                                onClick={() => onBackgroundColorChanged(colorIndex)}>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainRoom;