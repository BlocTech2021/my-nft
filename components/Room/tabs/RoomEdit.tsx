import { allColors } from "../../../lib/colors/color";
import { Room } from "../../../lib/types";
import { ColorSelector } from "../../common/Color/ColorSelector";

export type RoomEditProps = {
  room: Room,
  onBackgroundColorChanged: (colorIndex: number) => any
}

export function RoomEdit({ room, onBackgroundColorChanged } : RoomEditProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-4">
        <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="rounded-md shadow-xs px-0 py-0 flex">
            <ColorSelector isSelected={(color, _colorIndex) => room.backgroundColor === color.name}
              onColorClicked={(_color, colorIndex) => onBackgroundColorChanged(colorIndex) } />
          </div>
        </div>
      </div>

      <div className="sm:col-span-4">
        { /* bg images */ }
      </div>
    </div>
  )
}