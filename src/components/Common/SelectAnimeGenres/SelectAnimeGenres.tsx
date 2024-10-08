import { Select, SelectItem } from '@nextui-org/react'
import { ChangeEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { fetchGenres, selectGenres } from '../../../features/animes/animesSlice'

import CloseIcon from '../../../assets/icons/close.svg?react'
import SelectorIcon from '../../../assets/icons/selector.svg?react'

interface Props {
  selectedValues: Set<string>
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  onClear: () => void
  isLoading: boolean
}
const SelectAnimeGenres = ({
  selectedValues,
  onChange,
  onClear,
  isLoading
}: Props): JSX.Element => {
  const dispatch = useAppDispatch()
  const animeGenres = useAppSelector(selectGenres)

  useEffect(() => {
    if (!animeGenres.length) {
      dispatch(fetchGenres())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeGenres])

  return (
    <div className="relative w-full sm:min-w-52 sm:max-w-52">
      <Select
        label="Жанры"
        size="sm"
        selectionMode="multiple"
        placeholder="Выберите жанры"
        selectedKeys={selectedValues}
        className="w-full sm:max-w-52"
        selectorIcon={<></>}
        onChange={onChange}
        isDisabled={isLoading}
      >
        {animeGenres.map((anime) => (
          <SelectItem key={anime.name}>{anime.russian}</SelectItem>
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

export default SelectAnimeGenres
