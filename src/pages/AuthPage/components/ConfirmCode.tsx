import { useEffect, useRef } from 'react'

interface Props {
  onSubmit: (code: string) => void
  otp: string[]
  setOtp: (otp: string[]) => void
}

export const ConfirmCode = ({ onSubmit, otp, setOtp }: Props) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]) // Array of refs for each input field

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Delete' &&
      e.key !== 'Tab' &&
      !e.metaKey
    ) {
      e.preventDefault()
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      const index = inputRefs.current.indexOf(e.target as HTMLInputElement)
      if (index > 0) {
        const newOtp = [...otp.slice(0, index - 1), '', ...otp.slice(index)]
        setOtp(newOtp)
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1]!.focus()
        }
      }
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    const index = inputRefs.current.indexOf(target)
    if (target.value) {
      const newOtp = [
        ...otp.slice(0, index),
        target.value,
        ...otp.slice(index + 1)
      ]
      setOtp(newOtp)
      if (newOtp.every((digit) => digit !== '')) {
        onSubmit(newOtp.join(''))
      }
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus()
      } else {
        target.blur() // Убираем фокус после последнего символа
      }
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text')
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return
    }
    const digits = text.split('')
    setOtp(digits)
  }

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  return (
    <section className=" py-10">
      <div className="container">
        <div>
          <p className="mb-1.5 text-sm font-medium text-dark dark:text-white">
            Код потдверждения
          </p>
          <form id="otp-form" className="flex gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[index] = el)}
                className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border focus:border-[#eb5628] bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
              />
            ))}
          </form>
        </div>
      </div>
    </section>
  )
}
