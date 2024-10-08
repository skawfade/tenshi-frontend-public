import { Select, SelectItem } from '@nextui-org/react'
import { ChangeEvent } from 'react'
import { ORDER_OPTIONS } from '../../../constants'
import SelectorIcon from '../../../assets/icons/selector.svg?react'

interface Props {
  selectedValues: Set<string>
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  isLoading: boolean
}

const SelectAnimeOrder = ({
  selectedValues,
  onChange,
  isLoading
}: Props): JSX.Element => {
  return (
    <div className="relative w-full sm:min-w-52 sm:max-w-52">
      <Select
        label="Сортировка"
        size="sm"
        selectionMode="single"
        placeholder="По популярности"
        selectedKeys={selectedValues}
        className="w-full sm:max-w-52"
        classNames={{
          popoverContent: 'max-h-full'
        }}
        onChange={onChange}
        disableSelectorIconRotation
        selectorIcon={<></>}
        isDisabled={isLoading}
      >
        {ORDER_OPTIONS.map((type) => (
          <SelectItem key={type.value}>{type.label}</SelectItem>
        ))}
      </Select>
      <SelectorIcon
        width={24}
        height={24}
        className="absolute top-3 right-3 z-50 cursor-pointer"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}

export default SelectAnimeOrder
