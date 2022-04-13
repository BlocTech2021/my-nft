import { allColors } from "../../../lib/colors/color";
import { Room } from "../../../lib/types";

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
        { /* bg images */ }
      </div>
    </div>
  )
}