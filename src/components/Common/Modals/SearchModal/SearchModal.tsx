import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input
} from '@nextui-org/react'

// Icons
import IconSquareRoundedX from '../../../../assets/icons/square_rounded_X.svg?react'
import IconSearch from '../../../../assets/icons/search.svg?react'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import {
  fetchAnimeSearch,
  resetState,
  selectAnimeSearchList
} from '../../../../features/search/searchSlice'
import { useDebounce } from 'use-debounce'
import AnimeCardSearch from '../../AnimeCardSearch/AnimeCardSearch'
import { useMediaQuery } from 'react-responsive'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
}

export default function SearchModal({ isOpen, onOpenChange, onClose }: Props) {
  const dispatch = useAppDispatch()
  const searchAnimes = useAppSelector(selectAnimeSearchList)
  const [valueSearch, setValueSearch] = useState('')
  const [valueDebounce] = useDebounce(valueSearch, 400)
  const inputRef = useRef<HTMLInputElement>(null) // добавлен реф

  const handleValueChange = useCallback(
    (value: string) => {
      if (!value) {
        dispatch(resetState())
        setValueSearch(value)
      } else {
        setValueSearch(value)
      }
    },
    [dispatch]
  )

  const handleClose = useCallback(() => {
    dispatch(resetState())
    setValueSearch('')
    onClose()
  }, [dispatch, onClose])

  useEffect(() => {
    if (isOpen && valueDebounce) {
      dispatch(fetchAnimeSearch({ search: valueDebounce }))
    }
    if (isOpen && inputRef.current) {
      inputRef.current.focus() // фокус на input при открытии
    }
  }, [dispatch, isOpen, valueDebounce])

  const isMobile = useMediaQuery({ maxWidth: 767 })

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      size={isMobile ? 'full' : 'xl'}
      onOpenChange={onOpenChange}
      onClose={handleClose}
      closeButton={<IconSquareRoundedX width={48} height={48} />}
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        closeButton:
          'p-0 mt-2 mr-1 hover:bg-transparent hover:stroke-danger transition ease-in-out duration-150'
      }}
      scrollBehavior="inside"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col pr-16">
              <Input
                ref={inputRef}
                startContent={<IconSearch stroke="#e5e7eb" strokeWidth={2} />}
                placeholder="Введите название аниме..."
                value={valueSearch}
                onValueChange={handleValueChange}
              />
            </ModalHeader>
            <ModalBody>
              <div className="h-96 min-h-96 gap-2 px-1 flex flex-col">
                {searchAnimes.length > 0 ? (
                  searchAnimes.map((anime) => (
                    <AnimeCardSearch key={anime.id} anime={anime} />
                  ))
                ) : (
                  <div>Тут будут результаты</div>
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
