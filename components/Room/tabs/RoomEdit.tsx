import { gql, useQuery } from "@apollo/client";
import { Room, RoomEdit } from "../../../lib/types";
import { getAllBackgroundImages } from "../../../__generated__/getAllBackgroundImages";
import { ColorSelector } from "../../common/Color/ColorSelector";
import classNames from "classnames";
import { allColors } from "../../../lib/colors/color";
import { getAllRoomIcons } from "../../../__generated__/getAllRoomIcons";

export type RoomEditTabProps = {
  room: Room,
  onRoomEdit: (roomEdit: RoomEdit) => any
}

export const GET_ALL_BACKGROUND_IMAGES = gql`
  query getAllBackgroundImages {
    getAllBackgroundImages {
      ok
      data {
        cloudinaryId
        publicId
        thumbnailUrl
        url
      }
    }
  }
`

export const GET_ALL_ROOM_ICONS = gql`
  query getAllRoomIcons {
    getAllRoomIcons {
      ok
      data {
        cloudinaryId
        publicId
        thumbnailUrl
        url
      }
    }
  }
`

export function RoomEditTab({ room, onRoomEdit } : RoomEditTabProps) {
  const { data, loading, error } = useQuery<getAllBackgroundImages>(GET_ALL_BACKGROUND_IMAGES);

  const { data: roomIconsData, loading: roomIconsLoading, error: roomIconsError } = useQuery<getAllRoomIcons>(GET_ALL_ROOM_ICONS);

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-6">
        <label htmlFor="room-icon" className="block text-xs font-medium mb-2">
          Room Icon
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="rounded-md shadow-xs px-0 py-0 container w-full overflow-x-auto">
            <ul className="flex mt-0 mb-0 overflow-x-auto overflow-y-visible">
              <li className="flex-grow-0 flex-shrink-0">
                <div className={classNames(room.roomIconUrl ? 'border-slate-200 border' : 'border-black border-2', "w-8 h-8 grow-0 basis-12 ml-1 mr-1 cursor-pointer flex items-center justify-center")}
                  onClick={() => {
                    onRoomEdit({ roomIconUrl: '' })
                  }}> {/** This is for no background image */}
                  <span>Clear</span>
                </div>
              </li>
              {
                roomIconsData && roomIconsData.getAllRoomIcons && roomIconsData.getAllRoomIcons.data &&
                  roomIconsData.getAllRoomIcons.data.map(roomIcon => (
                    <li key={roomIcon.publicId} className="flex-grow-0 flex-shrink-0">
                      <div key={roomIcon.publicId} className={classNames(roomIcon.url === room.roomIconUrl ? 'border-black border-2' : '', "w-8 h-8 grow-0 basis-12 mr-1 cursor-pointer")}
                        onClick={() => {
                          onRoomEdit({ roomIconUrl: roomIcon.url })
                        }}>
                        <img src={roomIcon.thumbnailUrl} alt="Room Icon" className="w-full h-full" />
                      </div>
                    </li>
                  ))
              }
            </ul>
            
          </div>
          
        </div>
      </div>


      <div className="sm:col-span-4">
        <label htmlFor="username" className="block text-xs font-medium mb-2">
          Wall Color
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="rounded-md shadow-xs px-0 py-0 flex">
            <ColorSelector isSelected={(color, _colorIndex) => room.backgroundColor === color.name}
              onColorClicked={(_color, colorIndex) => onRoomEdit({ backgroundColor: allColors[colorIndex].name, backgroundImage: '' })  } />
          </div>
        </div>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="username" className="block text-xs font-medium mb-2">
          Wallpaper
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="rounded-md shadow-xs px-0 py-0 container w-full overflow-x-auto">
            <ul className="flex mt-0 mb-0 overflow-x-auto overflow-y-visible">
              <li className="flex-grow-0 flex-shrink-0">
                <div className={classNames(room.backgroundImage ? 'border-slate-200 border' : 'border-black border-2', "w-8 h-6 grow-0 basis-12 ml-1 mr-1 cursor-pointer flex items-center justify-center")}
                  onClick={() => {
                    onRoomEdit({ backgroundImage: '' })
                  }}> {/** This is for no background image */}
                  <span>Clear</span>
                </div>
              </li>
              {
                data && data.getAllBackgroundImages && data.getAllBackgroundImages.data &&
                  data.getAllBackgroundImages.data.map(bgImg => (
                    <li key={bgImg.publicId} className="flex-grow-0 flex-shrink-0">
                      <div key={bgImg.publicId} className={classNames(bgImg.url === room.backgroundImage ? 'border-black border-2' : '', "w-8 h-6 grow-0 basis-12 mr-1 cursor-pointer")}
                        onClick={() => {
                          onRoomEdit({ backgroundImage: bgImg.url })
                        }}>
                        <img src={bgImg.thumbnailUrl} alt="Background Image" className="w-full h-full" />
                      </div>
                    </li>
                  ))
              }
            </ul>
            
          </div>
          
        </div>
      </div>
    </div>
  )
}