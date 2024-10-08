import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react'

import { useCallback, useState } from 'react'

interface Props {
  isOpen: boolean
  onSubmit: (image: File) => void
  onClose: () => void
}

export default function AvatarModal({ isOpen, onClose, onSubmit }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedFileName, setSelectedFileName] = useState<string>('Пусто')

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event?.target?.files) {
        setSelectedFileName(event?.target?.files[0].name)
        setSelectedFile(event?.target?.files[0])
      }
    },
    []
  )

  const handleSubmit = useCallback(() => {
    if (selectedFile) {
      onSubmit(selectedFile)
    }
  }, [onSubmit, selectedFile])

  const handleClose = useCallback(() => {
    setSelectedFileName('Пусто')
    setSelectedFile(null)
    onClose()
  }, [onClose])

  return (
    <Modal
      backdrop="transparent"
      isDismissable={false}
      isOpen={isOpen}
      onClose={handleClose}
      size="sm"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold text-[#eb5628]">
                Выберите аватар
              </h3>
            </ModalHeader>
            <ModalBody>
              {/* <div className="grid grid-cols-2 gap-8">
                {AVATAR_URLS.map((avatar) => (
                  <div
                    key={avatar.label}
                    className={`cursor-pointer p-1 rounded-full transition-transform duration-200 ${avatar === selectedImage ? 'border-2 border-green-500 scale-105' : ''}`}
                    onClick={() => onChange(avatar.url)}
                  >
                    <Avatar
                      src={avatar.url}
                      alt={`Avatar ${avatar.label}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div> */}

              <div className="grid w-full max-w-xs items-center gap-1.5">
                <label
                  htmlFor="image"
                  className="hover:text-[#eb5628] transition ease-in-out duration-150 cursor-pointer flex h-10 w-full rounded-md border border-input bg-white dark:bg-gray-900 px-3 py-2 text-sm text-black dark:text-gray-100 file:border-0 file:bg-transparent file:text-gray-600 dark:file:text-gray-50 file:text-sm file:font-medium"
                >
                  Загрузите файл
                  <span className="pl-3 text-gray-500 truncate max-w-36">
                    {selectedFileName}
                  </span>
                </label>
                <p
                  className=" text-xs text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
                <input
                  id="image"
                  type="file"
                  onChange={handleFileChange}
                  style={{ visibility: 'hidden', height: 0 }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
              <Button
                className="text-white bg-[#eb5628]"
                variant="solid"
                onPress={handleSubmit}
              >
                Сохранить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
