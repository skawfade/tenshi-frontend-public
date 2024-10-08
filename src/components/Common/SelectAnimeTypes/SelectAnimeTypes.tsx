import { Select, SelectItem } from '@nextui-org/react'
import { ChangeEvent } from 'react'
import { ANIME_TYPES } from '../../../constants'
import CloseIcon from '../../../assets/icons/close.svg?react'
import SelectorIcon from '../../../assets/icons/selector.svg?react'

interface Props {
  selectedValues: Set<string>
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  onClear: () => void
  isLoading: boolean
}

const SelectAnimeTypes = ({
  selectedValues,
  onChange,
  onClear,
  isLoading
}: Props): JSX.Element => {
  return (
    <div className="relative w-full sm:min-w-52 sm:max-w-52">
      <Select
        label="Тип"
        size="sm"
        selectionMode="single"
        placeholder="TV, Movie, OVA"
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
        {ANIME_TYPES.map((type) => (
          <SelectItem key={type.value}>{type.label}</SelectItem>
        ))}
      </Select>
      {selectedValues.size > 0 ? (
        <CloseIcon
          width={24}
          height={24}
          className="absolute top-3 right-3 z-50 transition ease-in-out duration-150 cursor-pointer"
          onClick={onClear}
        />
      ) : (
        <SelectorIcon
          width={24}
          height={24}
          className="absolute top-3 right-3 z-50 cursor-pointer"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </div>
  )
}

export default SelectAnimeTypes
