import classNames from "classnames";
import { allColors, Color } from "../../../lib/colors/color";

export type ColorSelectorProps = {
  isSelected: (color: Color, colorIndex: number) => boolean;
  onColorClicked: (color: Color, colorIndex: number) => any,
  disabled?: boolean
}

export function ColorSelector({ isSelected, onColorClicked, disabled} : ColorSelectorProps) {
  return (
    <>
      {
        allColors.map((color, colorIndex) => (
          <div key={color.name} className="px-2">
            <div role="checkbox" className={classNames( disabled ? 'cursor-not-allowed' : '', "w-6 h-6 inline-flex rounded-full cursor-pointer border-2 border-gray-200 focus:outline-none focus:shadow-outline")}
                style={{ background: color.startRgb, boxShadow: isSelected(color, colorIndex) ? '0 0 0 4px rgba(0, 0, 0, 0.6)' : undefined }}
                onClick={() => onColorClicked(color, colorIndex)}>
            </div>
          </div>
        ))
      }
    </>
  )
}