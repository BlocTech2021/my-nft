import { gql, useQuery } from "@apollo/client";
import { Room, RoomEdit } from "../../../lib/types";
import { getAllBackgroundImages } from "../../../__generated__/getAllBackgroundImages";
import { ColorSelector } from "../../common/Color/ColorSelector";
import classNames from "classnames";
import { allColors } from "../../../lib/colors/color";

export type RoomEditTabProps = {
  room: Room,
  onRoomEdit: (roomEdit: RoomEdit) => any
}

export const getAllBackgroundImages = gql`
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

export function RoomEditTab({ room, onRoomEdit } : RoomEditTabProps) {
  const { data, loading, error } = useQuery<getAllBackgroundImages>(getAllBackgroundImages);

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-4">
        <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="rounded-md shadow-xs px-0 py-0 flex">
            <ColorSelector isSelected={(color, _colorIndex) => room.backgroundColor === color.name}
              onColorClicked={(_color, colorIndex) => onRoomEdit({ backgroundColor: allColors[colorIndex].name, backgroundImage: '' })  } />
          </div>
        </div>
      </div>

      <div className="sm:col-span-4">
        <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-2">
          Background Image
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="rounded-md shadow-xs px-0 py-0 flex">
            <div className={classNames(room.backgroundImage ? 'border-slate-200' : 'border-black', "w-12 h-9 border-2 mr-1 cursor-pointer")}
              onClick={() => {
                onRoomEdit({ backgroundImage: '' })
              }}> {/** This is for no background image */}

            </div>

            {
              data && data.getAllBackgroundImages && data.getAllBackgroundImages.data &&
                data.getAllBackgroundImages.data.map(bgImg => (
                  <div className={classNames(bgImg.url === room.backgroundImage ? 'border-black border-2' : '', "w-12 h-9 mr-1 cursor-pointer")}
                    onClick={() => {
                      onRoomEdit({ backgroundImage: bgImg.url })
                    }}>
                    <img src={bgImg.thumbnailUrl} alt="Background Image" className="w-full h-full" />
                  </div>
                ))
            }
          </div>

          
        </div>
      </div>
    </div>
  )
}