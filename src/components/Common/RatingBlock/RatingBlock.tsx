import React, { useState } from 'react'
import StarIcon from '../../../assets/icons/star.svg?react'
import { Tooltip } from '@nextui-org/react'

interface RatingProps {
  initialRating: number
  rateTotal: number
  onRate: (rating: number) => void
}

const RatingBlock: React.FC<RatingProps> = ({
  initialRating,
  rateTotal,
  onRate
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const handleRating = (newRating: number) => {
    onRate(newRating)
  }

  // Получаем текущее значение рейтинга при наведении или текущее состояние рейтинга
  const currentRating =
    hoverRating !== null ? hoverRating : Math.round(initialRating)

  // Функция для получения цвета звезды
  const getStarColor = (star: number) => {
    if (star <= currentRating) {
      if (currentRating >= 4.5) return 'fill-[#f1673d]' // Фиолетовый для 4.5+
      if (currentRating >= 4) return 'fill-green-600' // Зелёный для 4
      if (currentRating >= 3) return 'fill-yellow-600' // Оранжевый для 3
      if (currentRating >= 2) return 'fill-orange-600'
      return 'fill-red-600' // Красный для 1-2
    }
    return 'fill-gray-400 dark:fill-gray-800' // Оставляем серую звезду для не закрашенных
  }

  const getRatingColor = () => {
    if (initialRating >= 4.5) return 'text-[#f1673d]' // Фиолетовый для 4.5+
    if (initialRating >= 4) return 'text-green-600' // Зелёный для 4
    if (initialRating >= 3) return 'text-yellow-600' // Оранжевый для 3
    if (initialRating >= 2) return 'text-orange-600'
    return 'text-red-600' // Красный для 1-2
  }

  const getTooltipContent = (star: number) => {
    switch (star) {
      case 1:
        return 'Плохо'
      case 2:
        return 'Пойдет'
      case 3:
        return 'Нормально'
      case 4:
        return 'Хорошо'
      case 5:
        return 'Шедевр'
      default:
        return 'Пойдет'
    }
  }

  return (
    <div className="relative pt-3 md:pt-0 md:mb-1 items-center flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Tooltip key={star} content={getTooltipContent(star)}>
          <label
            key={star}
            className="cursor-pointer text-3xl relative"
            onMouseEnter={() => setHoverRating(star)} // Устанавливаем текущее наведение
            onMouseLeave={() => setHoverRating(null)} // Возвращаем текущее значение после наведения
          >
            <input
              type="radio"
              value={star}
              className="hidden"
              onClick={() => handleRating(star)} // Устанавливаем рейтинг при клике
            />

            <StarIcon
              className={`transition-colors duration-300 ${getStarColor(star)}`}
            />
          </label>
        </Tooltip>
      ))}
      <div className="flex flex-col">
        <span className={`text-base font-bold ${getRatingColor()}`}>
          {initialRating}
        </span>
        <span className="text-xs">{rateTotal} оценок</span>
      </div>
    </div>
  )
}

export default RatingBlock
