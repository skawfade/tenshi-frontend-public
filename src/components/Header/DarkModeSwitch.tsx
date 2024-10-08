import { useSwitch, VisuallyHidden, SwitchProps } from '@nextui-org/react'

import IconSunFilled from '../../assets/icons/sun_filled.svg?react'
import IconMoonFilled from '../../assets/icons/moon_filled.svg?react'

const DarkModeSwitch = (props: SwitchProps) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch(props)

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input
            {...getInputProps()}
          />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            color: 'secondary',
            class: [
              'h-8 w-8',
              'flex items-center justify-center',
              'rounded-lg bg-default-100 hover:bg-default-200'
            ]
          })}
        >
          {isSelected ? (
            <IconMoonFilled width={16} height={16} />
          ) : (
            <IconSunFilled width={16} height={16} />
          )}
        </div>
      </Component>
    </div>
  )
}

export default DarkModeSwitch
